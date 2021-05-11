/**
 * Created by Andy on 2017/12/1.
 */
import scannerConfig from "./scanner/scanner.js"
import dtcDetail from "./dtc.detail/dtcDetail.js"

export default angular.module("pages.dataSingle", [])
    .config(scannerConfig)
    .directive("dtcDetail", dtcDetail);