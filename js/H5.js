/**h5 内容管理对象**/

var H5 = function(){
    this.id= ('h5_' + Math.random()).replace('.','_');
    this.el = $('<div class="h5" id="' + this.id + '"></div>').hide();

    this.page = []
    $('body').append( this.el);

    /**
     * 新增一页
     * @param {string} name 组件名称，会加入到className 中
     * @param {string} text 页面默认文本
     * @return {h5} H5对象，可以重复使用H5对象支持的方法
     */
    this.addPage = function(name, text){
        var page = $('<div class="h5_page section"></div>')

        if(name != undefined){
            page.addClass('h5_page_' + name);
        }
        if(text != undefined){
            page.text(text);
        }
        this.el.append(page);

        this.page.push(page);
        return this;
    };


    /**
     * in增一个组件
     * @param name
     * @param cfg
     * @returns {H5}
     */
    this.addComponent = function(name, cfg) {
        var cfg = cfg || {};
        var component;
        var page = this.page.slice(-1)[0];

        cfg = $.extend({
            type : 'base'
        }, cfg);

        switch (cfg.type) {
            case 'base':
            {
                component = new H5ComponentBase(name, cfg);
                break;
            }
            default:
                ;
        }
        page.append(component);
        return this;
    };

    // H5 对象初始化
    this.loader = function(){
        this.el.fullpage({
            onLeave:function(index, nextIndex, direction){
               $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad:function(anchorLink,index){
                $(this).find('.h5_component').trigger('onLoad');
            }
        });
        this.page[0].find('.h5_component').trigger('onLoad');
        this.el.show();
    }

    return this;
}