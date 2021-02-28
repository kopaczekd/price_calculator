function show_div_with_body_part(id_div){
    div_to_select = ('#' + id_div);
    div_to_show = $(div_to_select);
    div_to_show.show("fast");
    current_visible_body_parts = div_to_show.find( "select" );
    current_visible_body_parts.prop("selectedIndex", 0);
};

$( document ).ready(function() {

//  Declarations
//    price_options_div = $('#price_promo_option');
    div_regular_price = $('#div_regular_price');
    div_3_1 = $('#div_3_1');
    div_10_30_1 = $('#div_10_30_1');
    div_x2_10 = $('#div_x2_10');
    div_x3_20 = $('#div_x3_20');
    div_x4_30 = $('#div_x4_30');
//    div_promo_code = $('#div_promo_code');

    price = $('#price');
    promo_code_div = $('#promo_code_div');
    div_first_visit = $('#div_first_visit');
    first_visit_checkbox = $('#first_visit');
    first_visit_label = $("label[for='first_visit']");
    all_body_parts = $('select[name="body_parts"]');
    treatments = $('#treatments');
    laserowy_lifting = $('#laserowy_lifting');
    pikosekundowe_zamykanie = $('#pikosekundowe_zamykanie');
    przebarwienia = $('#przebarwienia');
    laserowy_peeling = $('#laserowy_peeling');
    mercedes = $('#mercedes');
    laserowe_usuwanie = $('#laserowe_usuwanie');
    hifu = $('#hifu');
    kriolipoliza = $('#kriolipoliza');
    cellulogia = $('#cellulogia');
    mezoterapia = $('#mezoterapia');
    medyczny_peeling = $('#medyczny_peeling');

    function hide_all_radio_divs(speed){
        div_regular_price.hide(speed);
        div_3_1.hide(speed);
        div_10_30_1.hide(speed);
        div_x2_10.hide(speed);
        div_x3_20.hide(speed);
        div_x4_30.hide(speed);
//        div_promo_code.hide(speed);
    };

    function hide_all_body_parts_divs(speed){
        laserowy_lifting.hide(speed);
        pikosekundowe_zamykanie.hide(speed);
        mercedes.hide(speed);
        laserowy_peeling.hide(speed);
        przebarwienia.hide(speed);
        laserowe_usuwanie.hide(speed);
        hifu.hide(speed);
        kriolipoliza.hide(speed);
        cellulogia.hide(speed);
        mezoterapia.hide(speed);
        medyczny_peeling.hide(speed);

        hide_all_radio_divs(speed);
        div_first_visit.hide(speed);
        promo_code_div.hide(speed);
    };

    function show_correct_price_choices(price_choices){

        hide_all_radio_divs("fast");
        div_regular_price.show("fast");
        $('#regular_price').prop('checked', true);

        if (!(price_choices.indexOf("3+1") == -1)){
            div_3_1.show("fast");
        };

        if (!(price_choices.indexOf("10-30%") == -1)){
            div_10_30_1.show("fast");
        };

        if (!(price_choices.indexOf("x2 -10%") == -1)){
            div_x2_10.show("fast");
        };

        if (!(price_choices.indexOf("x3 -20%") == -1)){
            div_x3_20.show("fast");
        };

        if (!(price_choices.indexOf("x4 -30%") == -1)){
            div_x4_30.show("fast");
        };

    };

    function set_regular_price(regular_price){
        price.hide("fast");
        price.attr('data-regular-price', regular_price);
        price.attr('data-calculated-price', regular_price);
        price.attr('data-calculated-price-first-visit', (regular_price*0.8));
        price.show("fast");

        if (first_visit_checkbox.prop('checked') == true){
            price.text(price.attr('data-calculated-price-first-visit') + ' PLN');
        } else {
            price.text(regular_price + ' PLN');
        }
    };

//  Hide all body_parts_options on load
    hide_all_body_parts_divs();

    treatments.on('change', function(){
        div_first_visit.hide("fast");
        hide_all_body_parts_divs("fast");
        id_div_to_show = $(this).val();
        show_div_with_body_part(id_div_to_show);
        price.text('0 PLN');
        price.attr('data-value', 0);
    });


    all_body_parts.each(function(){
        $(this).change(function(){
            set_regular_price($(this).val());

//          Set correct radio choices
            var selected_body_part = $(this).find('option:selected');
            var price_choices = selected_body_part.data('price-choices');
            show_correct_price_choices(price_choices);
            div_first_visit.show("fast");

//          Reset first_visit_checkbox after earlier settings
            disable_first_visit_checkbox(false);
        });
    });


    first_visit_checkbox.click(function(){
        if ($(this).prop('checked') == true){
            price.hide("fast");
            price.text(price.attr('data-calculated-price-first-visit') + ' PLN');
            price.show("fast");
        } else {
            price.hide("fast");
            price.text(price.attr('data-calculated-price') + ' PLN');
            price.show("fast");
        };
    });


    $('#price_promo_option input').each(function(index) {
        $(this).on("click", function(){

            disable_first_visit_checkbox(false);
            clicked_radio = $(this).val();
            if (clicked_radio == 'regular_price'){

                promo_code_div.hide("fast");
                price.hide("fast");
                price.attr('data-calculated-price', price.attr('data-regular-price'));
                price.attr('data-calculated-price-first-visit', Math.round((price.attr('data-regular-price')*0.8)));
                if (first_visit_checkbox.prop('checked') == true){
                    price.text(Math.round((price.attr('data-regular-price')*0.8)) + ' PLN');
                } else {
                    price.text(price.attr('data-regular-price') + ' PLN');
                }
                price.show("fast");

            } else if (clicked_radio == '3+1'){

                promo_code_div.hide("fast");
                price.hide("fast");
                new_calculated_price = Math.round((price.attr('data-regular-price')*3));
                price.attr('data-calculated-price', new_calculated_price);
                if (first_visit_checkbox.prop('checked') == true){
                    first_visit_checkbox.click();
                };
                price.text(price.attr('data-calculated-price') + ' PLN');
                disable_first_visit_checkbox(true);
                price.show("fast");

            } else if (clicked_radio == '10-30%'){

                promo_code_div.hide("fast");
                price.hide("fast");
                new_calculated_price = Math.round(((price.attr('data-regular-price')*10)*0.7));
                price.attr('data-calculated-price', new_calculated_price);
                if (first_visit_checkbox.prop('checked') == true){
                    first_visit_checkbox.click();
                };
                price.text(price.attr('data-calculated-price') + ' PLN');
                disable_first_visit_checkbox(true);
                price.show("fast");

            } else if (clicked_radio == 'x2 -10%'){

                promo_code_div.hide("fast");
                price.hide("fast");
                new_calculated_price = Math.round(((price.attr('data-regular-price')*2)*0.9));
                price.attr('data-calculated-price', new_calculated_price);
                if (first_visit_checkbox.prop('checked') == true){
                    first_visit_checkbox.click();
                };
                price.text(price.attr('data-calculated-price') + ' PLN');
                disable_first_visit_checkbox(true);
                price.show("fast");

            } else if (clicked_radio == 'x3 -20%'){

                promo_code_div.hide("fast");
                price.hide("fast");
                new_calculated_price = Math.round(((price.attr('data-regular-price')*3)*0.8));
                price.attr('data-calculated-price', new_calculated_price);
                if (first_visit_checkbox.prop('checked') == true){
                    first_visit_checkbox.click();
                };
                price.text(price.attr('data-calculated-price') + ' PLN');
                disable_first_visit_checkbox(true);
                price.show("fast");

            } else if (clicked_radio == 'x4 -30%'){

                promo_code_div.hide("fast");
                price.hide("fast");
                new_calculated_price = Math.round(((price.attr('data-regular-price')*4)*0.7));
                price.attr('data-calculated-price', new_calculated_price);
                if (first_visit_checkbox.prop('checked') == true){
                    first_visit_checkbox.click();
                };
                price.text(price.attr('data-calculated-price') + ' PLN');
                disable_first_visit_checkbox(true);
                price.show("fast");

            };
//            else if (clicked_radio == 'promo_code'){
//                promo_code_div.show("fast");
//                price.attr('data-calculated-price', price.attr('data-regular-price'))
//                price.attr('data-calculated-price-first-visit', (price.attr('data-regular-price')*0.8))
//
//                if (first_visit_checkbox.prop('checked') == true){
//                    price.text(price.attr('data-calculated-price-first-visit') + ' PLN');
//                } else {
//                    price.text(price.attr('data-calculated-price') + ' PLN');
//                };
//            };
        });
    });


    function disable_first_visit_checkbox(decision){
        if (decision){
            first_visit_checkbox.prop("disabled", true);
            first_visit_label.css("text-decoration", "line-through");
        } else {
            first_visit_checkbox.prop("disabled", false);
            first_visit_label.css("text-decoration", "none");
        };
    };

});
