/**
 * Created by Andy on 2018/1/13.
 */

export default function({prayload, $rootScope}){
    $rootScope.scrollCoordinate = prayload.serverData;

    return "scrollCoordinate";
}