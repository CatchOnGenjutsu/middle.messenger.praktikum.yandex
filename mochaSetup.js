/* global global */

import { JSDOM } from "jsdom";

const jsdom = new JSDOM(`<body></body>`, { url: "http://localhost" });

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
global.DOMParser = jsdom.window.DOMParser;
global.HTMLElement = jsdom.window.HTMLElement;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
