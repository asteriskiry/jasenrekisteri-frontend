import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildCsv,
  exportToCsv,
} from '../src/components/commons/table/csvExport.js';

const columns = [{ text: 'UTU', dataField: 'utuAccount' }];

test('spreadsheet formulas and whitespace/control evasions are exported as text', () => {
  for (const value of [
    '=1+1',
    '+1+1',
    '-1+1',
    '@SUM(A1)',
    '\t=1+1',
    '\r=1+1',
    '\n=1+1',
    '  =1+1',
    '\u0000=1+1',
    '\ufeff=1+1',
    '＝1+1',
    '＋1+1',
    '－1+1',
    '＠SUM(A1)',
  ]) {
    assert.equal(
      buildCsv(columns, [{ utuAccount: value }]),
      `"UTU"\r\n"'${value}"`
    );
  }
});

test('CSV quoting contains injected separators, quotes and line breaks inside their cell', () => {
  assert.equal(
    buildCsv(columns, [{ utuAccount: 'normal,=1+1;"quoted"\r\nnext' }]),
    '"UTU"\r\n"normal,=1+1;""quoted""\r\nnext"'
  );
  assert.equal(
    buildCsv(columns, [{ utuAccount: '=1+1",=2+2' }]),
    '"UTU"\r\n"\'=1+1"",=2+2"'
  );
  assert.equal(
    buildCsv(columns, [{ utuAccount: 'before\rafter' }]),
    '"UTU"\r\n"before\rafter"'
  );
});

test('normal Finnish text, empty values, dates and booleans retain their values', () => {
  const data = [
    'Ääkkönen',
    'test.user',
    null,
    undefined,
    false,
    500,
    '2027-07-31',
  ];
  assert.equal(
    buildCsv(
      columns,
      data.map((utuAccount) => ({ utuAccount }))
    ),
    '"UTU"\r\n"Ääkkönen"\r\n"test.user"\r\n""\r\n""\r\n"false"\r\n"500"\r\n"2027-07-31"'
  );
  assert.equal(
    buildCsv([{ text: '=header', dataField: 'utuAccount' }], []),
    '"\'=header"'
  );
});

test('the download path uses the protected CSV and releases the object URL', async (t) => {
  let blob;
  let clicked = false;
  let revoked;
  const link = {
    click() {
      clicked = true;
    },
  };
  const previousDocument = globalThis.document;
  globalThis.document = {
    createElement: () => link,
    body: { appendChild() {}, removeChild() {} },
  };
  t.after(() => {
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
  });
  t.mock.method(URL, 'createObjectURL', (value) => {
    blob = value;
    return 'blob:csv-test';
  });
  t.mock.method(URL, 'revokeObjectURL', (value) => {
    revoked = value;
  });
  exportToCsv('members.csv', columns, [{ utuAccount: '=1+1' }]);
  assert.equal(await blob.text(), '"UTU"\r\n"\'=1+1"');
  assert.equal(link.download, 'members.csv');
  assert.equal(clicked, true);
  assert.equal(revoked, 'blob:csv-test');
});
