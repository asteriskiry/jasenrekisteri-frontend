import React from 'react';
import './imageLoaderComponent.css';

const _loaded = {};

class ImageLoader extends React.Component {
    state = {
        loaded: _loaded[this.props.src],
    };

    static defaultProps = {
        className: '',
        loadingClassName: 'img-loading',
        loadedClassName: 'img-loaded',
    };

    onLoad = () => {
        _loaded[this.props.src] = true;
        this.setState(() => ({ loaded: true }));
    };

    render() {
        let { className, loadedClassName, loadingClassName } = this.props;

        className = `${className} ${
            this.state.loaded ? loadedClassName : loadingClassName
        }`;

        return (
            <div className={className}>
                <img
                    src={this.props.src}
                    onLoad={this.onLoad}
                    alt={this.props.alt}
                />
                <div />
            </div>
        );
    }
}

export default ImageLoader;
