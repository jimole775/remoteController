/**
 * Created by Andy on 2017/12/3.
 */
export default function (scope,fn) {
    var phase = scope.$root.$$phase;
    if (phase == '$apply' || phase == '$digest') {
        if (fn && (typeof(fn) === 'function')) {
            fn();
        }
    }
    else {
        scope.$apply(fn);
    }
}