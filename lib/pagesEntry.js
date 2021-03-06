'use strict'
const path = require( 'path' )
const { getAppObj } = require('./util')

// 获取指定目录下符合glob的所有文件
module.exports = function(file) {
    let entries = {},
        mainObj = {},
        pages,
        subpackages

    try {
        mainObj = getAppObj(file) || {}
        pages = mainObj.pages || []
        subpackages = mainObj.subpackages || mainObj.subPackages || []
        
        pages.forEach(p=>{
            entries[p] = path.resolve(`src/${p}.js`)
        })
        subpackages.forEach(sp=>{
            let {root, pages} = sp
            if(root && pages.length>0){
                pages.forEach(p=>{
                    entries[`${root}/${p}`] = path.resolve(`src/${root}/${p}.js`)
                })
            }
        })
        
    } catch (e) {
        console.log(e)
    }

    return entries
}