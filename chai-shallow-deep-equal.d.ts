/// <reference types="chai" />

declare module "chai-shallow-deep-equal" {
    function chaiShallowDeepEqual(chai: any, utils: any): void;
    namespace chaiShallowDeepEqual{}
    export = chaiShallowDeepEqual;
}

declare namespace Chai {

    // For Assert API
    interface Assert {
        shallowDeepEqual(actual: any, expected: any, message?: string);
    }

    // For Chai as promised
    interface PromisedAssert {
        shallowDeepEqual(actual: any, expected: any, message?: string): any;
    }

}
