//  SPDX-FileCopyrightText: 2024 Ascensio System SIA
//
//  SPDX-License-Identifier: Ascensio-System
//
//     Our License onlyoffice.com
//     Empty line
//     Empty line
//     Empty line
//     Empty line
//     Empty line
//     Empty line
//     Empty line
//     

!window.common && (window.common = {});
!common.controller && (common.controller = {});
if (SSE === undefined) {
    var SSE = {};
}
SSE.Keys={RETURN:   13};

SSE.CellEditorController = new(function(){
    var  me,
        api,
        editor,
        created=false;

    function  onLaunch(){
        SSE.CellEditorView.create();
        editor = SSE.CellEditorView;
    }

    function createController() {
        me = this;
        if (created) return me;

        created = true;
        onLaunch();
        return me;
    }

    function setApi(apiF){
        api=apiF;
    }

    return {
        create: createController,
        setApi: setApi
    }

})();