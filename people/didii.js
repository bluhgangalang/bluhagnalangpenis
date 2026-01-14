(function() {
    'use strict';
    
    const redirectUrl = 'http://oh_no_dont_do_that.com/';
    let pageLoaded = false;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            pageLoaded = true;
        }, 1000);
    });
    
    document.addEventListener('contextmenu', e => {
        e.preventDefault();
        if (pageLoaded) window.location.href = redirectUrl;
    });
    
    document.addEventListener('keydown', e => {
        if (e.keyCode === 123) {
            e.preventDefault();
            window.location.href = redirectUrl;
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            window.location.href = redirectUrl;
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            window.location.href = redirectUrl;
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            window.location.href = redirectUrl;
            return false;
        }
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            window.location.href = redirectUrl;
            return false;
        }
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            window.location.href = redirectUrl;
            return false;
        }
    });
    
    let devtoolsOpen = false;
    const threshold = 160;
    
    const detectDevTools = () => {
        if (!pageLoaded) return;
        
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                window.location.href = redirectUrl;
            }
        }
    };
    
    const detectConsole = () => {
        if (!pageLoaded) return;
        const element = new Image();
        Object.defineProperty(element, 'id', {
            get: function() {
                window.location.href = redirectUrl;
                throw new Error('DevTools detected');
            }
        });
        console.log(element);
    };
    
    const detectDebugger = () => {
        if (!pageLoaded) return;
        const start = performance.now();
        debugger;
        const end = performance.now();
        if (end - start > 100) {
            window.location.href = redirectUrl;
        }
    };
    
    const detectToString = () => {
        if (!pageLoaded) return;
        const div = document.createElement('div');
        Object.defineProperty(div, 'id', {
            get: function() {
                window.location.href = redirectUrl;
            }
        });
        console.log(div);
    };
    
    setTimeout(() => {
        setInterval(detectDevTools, 500);
        setInterval(detectDebugger, 1000);
        setInterval(detectConsole, 2000);
        setInterval(detectToString, 3000);
    }, 1500);
    
    if (window.console && (window.console.firebug || window.console.exception)) {
        setTimeout(() => {
            if (pageLoaded) window.location.href = redirectUrl;
        }, 1000);
    }
    
    if (window.chrome && window.chrome.runtime) {
        const checkDevTools = () => {
            if (!pageLoaded) return;
            const before = new Date();
            debugger;
            const after = new Date();
            if (after - before > 100) {
                window.location.href = redirectUrl;
            }
        };
        setTimeout(() => {
            setInterval(checkDevTools, 1000);
        }, 1500);
    }
    
    if (window.location.protocol === 'view-source:') {
        window.location.href = redirectUrl;
    }
    
    if (window.top !== window.self) {
        window.location.href = redirectUrl;
    }
    
    document.addEventListener('selectstart', e => e.preventDefault());
    document.addEventListener('copy', e => e.preventDefault());
    
    setInterval(() => {
        console.clear();
    }, 100);
    
    const noop = () => {};
    ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace', 'dir', 'dirxml', 'group', 'groupCollapsed', 'groupEnd', 'clear', 'count', 'countReset', 'assert', 'profile', 'profileEnd', 'time', 'timeLog', 'timeEnd', 'timeStamp', 'context', 'memory'].forEach(method => {
        console[method] = noop;
    });
    
})();
