var timeout=200; // time to begin search after keypressed (miliseconds)
var ajax_call;
var typingTimeout;
var multiple_sort=0;

function ctSearchFocus(table_id){
    if($('#'+table_id+'_search').val()=='')
        $('#'+table_id+'_search_value').animate({opacity: 0.25}, 300);
}

function ctSearchBlur(table_id){
    if($('#'+table_id+'_search').val()=='')
        $('#'+table_id+'_search_value').animate({opacity: 1}, 300);
}

function ctSearchKeypress(table_id){
    if($('#'+table_id+'_search').val()=='')
        $('#'+table_id+'_search_value').animate({opacity: 0}, 10);
}

function ctSearch(table_id){
    if($('#'+table_id+'_search').val()=='')
        $('#'+table_id+'_search_value').animate({opacity: 0.25}, 300);

    window.clearInterval(typingTimeout);
    typingTimeout = window.setTimeout(function() { ctSubmitForm(table_id,1,false,'items_per_page,tbody,pager','') },timeout);
}

function ctMultiSearch(table_id){
    window.clearInterval(typingTimeout);
    typingTimeout = window.setTimeout(function() { ctSubmitForm(table_id,1,false,'items_per_page,tbody,pager','') },timeout);
}

function ctShowAdvancedSearch(table_id){
    $('#'+table_id+'_multiple_search').toggle();
}


function ctItemsPerPage(table_id){
    if(items_per_page_ids.length==0){
        $('#'+table_id+'_items_per_page').val($('#'+table_id+'_items_per_page_change').val());
        ctSubmitForm(table_id,1,true,'tbody,pager','');
    }else{
        for(i=0; i<items_per_page_ids.length; i++){
            if($('#'+items_per_page_ids[i]+'_items_per_page_change').val()!=$('#'+table_id+'_items_per_page').val())
                var items_per_page_changed_index=i;
        }
        $('#'+table_id+'_items_per_page').val($('#'+items_per_page_ids[items_per_page_changed_index]+'_items_per_page_change').val());
        ctSubmitForm(table_id,1,true,'items_per_page,tbody,pager','');
    }
}

function ctSort(table_id,sort_column){
    var sort_num;
    var sort_order;
    var max_num=1;
    var str_sort='';
    var sort_aux='';
    var arr_sort_aux='';

    var arr_sort_order_txt= new Array();
    arr_sort_order_txt["a"]="_asc";
    arr_sort_order_txt["d"]="_desc";
    arr_sort_order_txt["t"]="";


    sort_aux=$('#'+table_id+'_sort').val();
    arr_sort_aux=sort_aux.split('_');

    if(multiple_sort==1){

        for(i=0; i<arr_sort_aux.length; i++){
            sort_num=arr_sort_aux[i].substring(0,arr_sort_aux[i].length-1);

            if(sort_num>max_num)
                max_num=sort_num;
        }

        for(i=0; i<arr_sort_aux.length; i++){
            sort_num=arr_sort_aux[i].substring(0,arr_sort_aux[i].length-1);
            sort_order=arr_sort_aux[i].substring(arr_sort_aux[i].length-1);

            if(sort_column==i+1){
                str_sort+=(str_sort!='' ? '_' : '')+(arr_sort_order[sort_order]=='t' ? '' : (sort_num!='' ? sort_num : parseInt(max_num)+1))+(arr_sort_order[sort_order]=='' ? arr_sort_order["first"] : arr_sort_order[sort_order]);
            }else{
                str_sort+=(str_sort!='' ? '_' : '')+(sort_order=='f' ? 'f' : sort_num+sort_order);
            }
        }

        $('#'+table_id+'_sort').val(str_sort);

        ctSubmitForm(table_id,1,true,'thead,tbody,pager','');

    }else{

        for(i=0; i<arr_sort_aux.length; i++){
            sort_num=arr_sort_aux[i].substring(0,arr_sort_aux[i].length-1);
            sort_order=arr_sort_aux[i].substring(arr_sort_aux[i].length-1);

            if(sort_column==i+1){
                str_sort+=(str_sort!='' ? '_' : '')+(arr_sort_order[sort_order]=='t' ? '' : 1)+(arr_sort_order[sort_order]=='' ? arr_sort_order["first"] : arr_sort_order[sort_order]);
            }else{
                str_sort+=(str_sort!='' ? '_' : '')+(sort_order=='f' ? 'f' : 't');
            }
        }

        $('#'+table_id+'_sort').val(str_sort);

        ctSubmitForm(table_id,1,true,'thead,tbody,pager','');

    }
}

function ctActions(table_id){
    return true;
}

function ctPager(table_id,page){
    ctSubmitForm(table_id,page,true,'tbody,pager','');
}

function onInit(){
    return true;
}

function onComplete(){
    return true;
}

// BUILD THE TABLE
// table_id = char (default = ct)
// page = integer or '' (the actual page is used)
// pass_total_items = true or false (when the number of total_items is maitained the set to true)
// reload_option = 'items_per_page'; 'thead'; 'tbody'; 'actions'; 'pager'; 'items_per_page,tbody'; 'items_per_page,tbody,pager'; ...
// extra_vars_json = JSON type, like, "name": "John","Age":"2"; You can get the values in PHP through $_POST['extra_vars']['name'] and $_POST['extra_vars']['age']
function ctSubmitForm(table_id,page,pass_total_items,reload_option,extra_vars_json){
    onInit();
    if ($('#success')) {
        $('#success').hide('slow');
    }
    if ($('#errors')) {
        $('#errors').hide('slow');
    }
    $('#'+table_id+'_loader').css("backgroundImage", "url(images/creativeTable/loading.gif)");
    var multiple_search_str='';
    $('#'+table_id+'_multiple_search th input').each(function(index) {
        //multiple_search_str+=(multiple_search_str=='' ? '' : ',')+'"'+($('#'+table_id+'_multiple_search'+(index+1)).val()==undefined ? '' : $('#'+table_id+'_multiple_search'+(index+1)).val())+'"';
        multiple_search_str+=(multiple_search_str=='' ? '' : ',')+'"'+($(this).val()==undefined ? '' : $(this).val())+'"';
    });

    var multiple_search=JSON.parse('['+multiple_search_str+']');

    var extra_vars_hidden='';
    if(extra_vars_json==undefined)
        extra_vars_json='';
    for(i=0; i<extra_vars.length; i++){
        extra_vars_json += (extra_vars_json=='' ? '' : ',')+'"'+extra_vars[i].substr(1)+'" : "'+$(extra_vars[i]).val()+'"';
        extra_vars_hidden += '<input type="hidden" name="extra_vars['+extra_vars[i].substr(1)+']" value="'+$(extra_vars[i]).val()+'" />';
    }
    if(reload_option.indexOf('export')!=-1){
		/*changed by akshay to append insted of prepend*/
        $('#'+table_id+'_form').append('<input type="hidden" name="export" value="'+reload_option.substr(7)+'" />');
        if(extra_vars_hidden!='')
            $('#'+table_id+'_form').prepend(extra_vars_hidden);
        $('#'+table_id+'_form').attr('target','_blank').submit();
        /*
        window.open(
            ajax_url+'?'+$('#'+table_id+'_form').serialize(),
            '_blank' // <- This is what makes it open in a new window.
        );
        */
		$('#'+table_id+'_loader').css('background-image','');
        return;
    }

    if(ajax_call!=undefined)
        ajax_call.abort();

    ajax_call = $.ajax({
        type: "POST",
        url: ajax_url,
        data: {
            "ajax_option" : reload_option,
            "id" : table_id,
            "items_per_page" : $('#'+table_id+'_items_per_page').val(),
            "sort" : $('#'+table_id+'_sort').val(),
            "page" : (page=='' ? $('#'+table_id+'_page').val() : page),
            "search" : $('#'+table_id+'_search').val(),
            "multiple_search" : multiple_search,
            "extra_cols" : extra_cols,
            "total_items" : (pass_total_items ? $('#'+table_id+'_total_items').val() : 0),
            //"search_init" : $('#'+table_id+'_search_init').val(),
            "extra_vars" : extra_vars_json!='' ? JSON.parse('{'+extra_vars_json+'}') : ''
        },

        dataType: 'json',
        success: function(out){

            $('#'+table_id+'_page').val(page);

            if(out.debug!='')
                $('#'+table_id+'_debug_container').replaceWith(out.debug);

            if(!pass_total_items)
                $('#'+table_id+'_total_items').val(out.total_items);

            if(reload_option.indexOf('items_per_page')!=-1){
                if(items_per_page_ids.length==0){
                    $('#'+table_id+'_items_per_page_container').html(out.items_per_page);
                }else{
                    for(i=0; i<items_per_page_ids.length; i++)
                        eval("$('#'+items_per_page_ids[i]+'_items_per_page_container').html(out.items_per_page"+(i+1)+");");
                }
            }

            if(reload_option.indexOf('thead')!=-1)
                $('#'+table_id+' thead').html(out.thead);

            if(reload_option.indexOf('tbody')!=-1)
                $('#'+table_id+' tbody').html(out.tbody);

            if(reload_option.indexOf('actions')!=-1)
                $('#'+table_id+'_actions_container').html(out.actions);

            if(reload_option.indexOf('pager')!=-1){
                if(pager_ids.length==0){
                    $('#'+table_id+'_pager_container').html(out.pager);
                }else{
                    for(i=0; i<pager_ids.length; i++)
                        eval("$('#'+pager_ids[i]+'_pager_container').html(out.pager"+(i+1)+");");
                }
            }

            // stops the loading gif
            $('#'+table_id+'_loader').css("backgroundImage", "");

            try {
                addFancybox(table_id);
            } catch (e) {};
            
            onComplete();

        }
    });

}

$(document).ready(function(){

    $(document).keydown(function(e) {
        if (e.shiftKey || e.ctrlKey || e.altKey)
            multiple_sort=1;
    }).keyup(function(e) {
        multiple_sort=0;
    });

});