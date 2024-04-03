// import { Component } from '../src/pages/Panel/slices/highlightedComponentSlice';
import initialData from "./mockData";

let data = JSON.parse(JSON.stringify(initialData));

type ChromeMessageListener = (message: any) => void;

interface MockRuntime {
  onMessage: {
    addListener: (callback: ChromeMessageListener) => void;
    removeListener: (callback: ChromeMessageListener) => void;
    _triggerMessage: (message: any) => void;
  };
  sendMessage: (message: MockMessageType) => void;
}

interface MockMessageType {
  message:
    | "getRootComponent"
    | "getSvelteVersion"
    | "handleClosedPanel"
    | "injectState"
    | "injectSnapshot";
  snapshot?: 'component';
  componentId?: number;
  newState?: {
    [stateKey: string]: number | string;
  };
}
interface QueryInfo {
  active: boolean;
  lastFocusedWindow: boolean;
}

interface MockTabs {
  query: (queryInfo: QueryInfo) => [{ id: number; url: string }];
  sendMessage: (tabId: number, message: MockMessageType) => void;
}

export interface MockChrome {
  runtime: MockRuntime;
  tabs: MockTabs;
  clearListeners: () => void;
  resetMockData: () => void;
  sendEmptyDataOnNextRequest: () => void;
}

let listeners: ChromeMessageListener[] = [];
let _sendEmptyDataOnNextRequest = false;



const chrome: MockChrome = {
  runtime: {
    onMessage: {
      addListener: (callback) => {
        listeners.push(callback);
      },
      _triggerMessage: (message) => {
        listeners.forEach((callback) => callback(message));
      },
      removeListener: (callback) => {
        listeners = listeners.filter((c) => c === callback);
      },
    },
    sendMessage: function (message) {},
  },
  tabs: {
    query: (queryInfo: QueryInfo) => {
      return [{ id: 0, url: "" }];
    },
    sendMessage: (tabId, request) => {
      switch (request.message) {
        case "getRootComponent":
          {
            let message: {};
            if (_sendEmptyDataOnNextRequest) {
              message = {
                type: "returnRootComponent",
                rootComponent: undefined,
              };
              _sendEmptyDataOnNextRequest = false;
            } else {
              message = {
                type: "returnRootComponent",
                rootComponent: JSON.parse(JSON.stringify(data)),
              };
            }
            listeners.forEach((f) => f(message));
          }
          break;
        case "getSvelteVersion":
          {
          }
          break;
        case "handleClosedPanel":
          {
          }
          break;
       
      }
    },
  },
  clearListeners: function () {
    listeners = [];
  },
  resetMockData: function () {
    data = JSON.parse(JSON.stringify(initialData));
  },
  sendEmptyDataOnNextRequest: function () {
    _sendEmptyDataOnNextRequest = true;
  },
};

export default chrome;
