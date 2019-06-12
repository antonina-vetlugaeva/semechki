(
    function ($) {
        $( document ).ready( function($) {

            //Variável User armazena a conta do usuário
            const userIg = $('.widget-instagram').attr('data-urlInstagran');

            if (userIg) {

                //Cria um cabeçalho com a conta do usuário e o logo do Instagram
                $('.username-insta').append(
                    $('<span class="fab fa-instagram instagram__logo"></span>')
                )
                .append(userIg).attr(
                    {
                        href: 'https://www.instagram.com/' + userIg,
                        target: '_blank'
                    }
                );

                //Busca as informações na página do usuário
                $.get('https://www.instagram.com/' + userIg)
                .done(function( data ) {

                    //Procura na página o JSON com os dados de imagens e vídeos
                    const jsonObject = data.match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1].slice(0, -1);
                    const userInfo = JSON.parse(jsonObject);
                    const userData = userInfo.entry_data.ProfilePage[0].graphql.user;

                    //Remove o logo do Instagram
                    $('.username-insta span').remove();

                    //Adiciona a imagem do usuário e cria uma lista para as fotos/vídeos
                    $('.username-insta').prepend('<img src=' + userData.profile_pic_url + '>').after($('<ul class=instagram />'));

                    //Adiciona as fotos na lista
                    for (let media of userData.edge_owner_to_timeline_media.edges) {
                        const node = media.node;
                        let classTypeIg = '';

                        //Verifica se o tipo é foto ou vídeo para estilizar
                        switch(node.__typename) {
                            case 'GraphVideo':
                                classTypeIg = 'instagram__video';
                                if(node.product_type && node.product_type === 'igtv')
                                    classTypeIg = 'instagram__igtv';
                                break;
                            case 'GraphSidecar':
                                classTypeIg = 'instagram__multi-fotos';
                                break;
                        }

                        //Adiciona cada imagem/vídeo na lista junto com seu respectivo link
                        let img = $('<img />', {src: node.thumbnail_src})
                        .appendTo($('.instagram'))
                        .wrap($('<li>'))
                        .wrap($('<a>',{
                            href: 'https://www.instagram.com/p/' + node.shortcode,
                            target: '_blank',
                            class: classTypeIg
                        }));
                    }
                })
                .fail(function(e){
                    console.error('Unable to retrieve photos. Reason: ' + e.toString());
                });
            }
        });

    } (jQuery)
);
