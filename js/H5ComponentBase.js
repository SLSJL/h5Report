/**基本图文组件对象**/


var H5ComponentBase = function( name,cfg ){

    var cfg = cfg || {};
    var id = ('h5_c_' + Math.random()).replace('.', '');

    // 把当前的组件类型 添加到样式中进行标记
    var cls = 'h5_component_name_' + name  + ' h5_component_' +  cfg.type;
    var component = $('<div class="h5_component '+ cls +'"  id="'+ id +'"></div>');


    // 处理自定义参数
    cfg.text && component.append(cfg.text);
    cfg.width && component.width(cfg.width/2);
    cfg.height && component.height(cfg.height/2);
    cfg.css && component.css(cfg.css);
    cfg.bg && component.css('backgroundImage','url('+ cfg.bg+')');


    if(cfg.center === true){

        component.css({
            marginLeft: (cfg.width/4 * -1 ) + "px",
            left:'50%'
        })

    }

    component.on('onLoad', function(){
        component.addClass('h5_component_' +  cfg.type + '_load').removeClass('h5_component_' +  cfg.type + '_leave');

        cfg.animateIn && component.animate(cfg.animateIn);
        return false;

    });

    component.on('onLeave', function(){
        component.addClass('h5_component_' +  cfg.type + '_leave').removeClass('h5_component_' +  cfg.type + '_load');
        cfg.animateOut && component.animate(cfg.animateOut);

        return false;
    });

    return component;
}