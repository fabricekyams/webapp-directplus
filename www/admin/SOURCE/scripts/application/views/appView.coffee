define [
  'jquery'
  'backbone'
  'application/models/slide'
  'application/views/slideView'
  'application/collections/slides'
  'vendors/socketio/socketio'
  ],($,Backbone,Slide,SlideView,Slides)->

   

    class appView extends Backbone.View

      #template : _.template($('#app-template').html())

      #events:
      

      initialize : ()->
        #Cette liste sera contenu dans la DB du serveur
        @socket = io.connect 'http://localhost:3000'
        @socket.emit 'admin' , 'Hello serveur i am the admin how are you?'
        @socket.emit 'reset' , '' 
        
        $('radio').on 'envoyer', (data)=>
          console.log "envoyer"
          #@socket.emit('next', data)
        $('.radio').on 'enlever', (data)=>
          #@socket.emit('remove', data)

        ### if @ind < @SlideListe.length
            socket.emit('next', @SlideListe[@ind]);
            @ind = @ind + 1;
          else 
            socket.emit('next', 'FIN');###
          

        @socket.on 'snext',(data)->
          console.log data ;
      
        @socket.on 'connect_failed', (reason) ->
          console.log('connection refusé')

        
        @slides = new Slides()

        @SlideListe = [
          id: '001'
          title: 'Oblivion'
          description : 'Après des décennies de guerre contre la terrible menace dénommée les Scavs, les humains ont quitté la Terre. Jack Harper, qui vit sur une station située dans les nuages, a pour mission d’extraire des ressources vitales nécessaires aux humains expatriés. Son existence est bouleversée lorsqu’il sauve une belle inconnue d’un vaisseau en déperdition. Son arrivée va déclencher une série d’évènements qui vont le forcer à remettre en question tout ce qu’il connaissait. '
        ,
          id: '002'
          title: 'L écume des jours'
          description : 'histoire surréelle et poétique d’un jeune homme idéaliste et inventif, Colin, qui rencontre Chloé, une jeune femme semblant être l’incarnation d’un blues de Duke Ellington. Leur mariage idyllique tourne à l’amertume quand Chloé tombe malade d’un nénuphar qui grandit dans son poumon. Pour payer ses soins, dans un Paris fantasmatique, Colin doit travailler dans des conditions de plus en plus absurdes, pendant qu’autour d’eux leur appartement se dégrade et que leur groupe d’amis, dont le talentueux Nicolas, et Chick, fanatique du philosophe Jean-Sol Partre, se délite. '
        ,
          id: '003'
          title: 'The Place Beyond the Pines' 
          description : 'Cascadeur à moto, Luke est réputé pour son spectaculaire numéro du «globe de la mort». Quand son spectacle itinérant revient à Schenectady, dans l’État de New York, il découvre que Romina, avec qui il avait eu une aventure, vient de donner naissance à son fils… Pour subvenir aux besoins de ceux qui sont désormais sa famille, Luke quitte le spectacle et commet une série de braquages. Chaque fois, ses talents de pilote hors pair lui permettent de s’échapper. Mais Luke va bientôt croiser la route d’un policier ambitieux, Avery Cross, décidé à s’élever rapidement dans sa hiérarchie gangrenée par la corruption. Quinze ans plus tard, le fils de Luke et celui d’Avery se retrouvent face à face, hantés par un passé mystérieux dont ils sont loin de tout savoir… '
        ,
          id: '004'
          title: 'Iron Man 3'
          description : 'Tony Stark, l’industriel flamboyant qui est aussi Iron Man, est confronté cette fois à un ennemi qui va attaquer sur tous les fronts. Lorsque son univers personnel est détruit, Stark se lance dans une quête acharnée pour retrouver les coupables. Plus que jamais, son courage va être mis à l’épreuve, à chaque instant. Dos au mur, il ne peut plus compter que sur ses inventions, son ingéniosité, et son instinct pour protéger ses proches. Alors qu’il se jette dans la bataille, Stark va enfin découvrir la réponse à la question qui le hante secrètement depuis si longtemps : est-ce l’homme qui fait le costume ou bien le costume qui fait l’homme ? '
        ,
          id: '005'
          title: 'Very Bad Trip 3'
          description : 'Suite et fin des aventures de Phil, Stu, Alan et Doug. '
        ,
          id: '006'
          title: 'Dead Man Talking'
          description : 'Une prison quelque part. William Lamers est condamné à mort...'
        ,
          id: '007'
          title: 'Star Trek Into Darkness'
          description : 'Alors qu’il rentre à sa base, l équipage de l’Enterprise doit faire face à des forces terroristes implacables au sein même de son organisation. L’ennemi a fait exploser la flotte et tout ce qu’elle représentait, plongeant notre monde dans le chaos… Dans un monde en guerre, le Capitaine Kirk, animé par la vengeance, se lance dans une véritable chasse à l’homme, pour neutraliser celui qui représente à lui seul une arme de destruction massive. Nos héros entrent dans un jeu d’échecs mortel. L’amour sera menacé, des amitiés seront brisées et des sacrifices devront être faits dans la seule famille qu’il reste à Kirk : son équipe. '
        ,
          id: '008'
          title: 'Parker'
          description : 'Parker est le plus audacieux et le plus redoutable des cambrioleurs. Spécialiste des casses réputés impossibles, il exige de ses partenaires une loyauté absolue et le respect scrupuleux du plan. Alors qu’une opération vient de mal tourner à cause d’une négligence,...'
        ,
          id: '009'
          title: 'Gatsby' 
          description : 'Printemps 1922. L époque est propice au relâchement des mœurs, à l essor du jazz et à l enrichissement des contrebandiers d alcool… Apprenti écrivain, Nick Carraway quitte la région du Middle-West pour s installer à New York. Voulant sa part du rêve américain, il vit désormais entouré d un mystérieux millionnaire, Jay Gatsby, qui s étourdit en fêtes mondaines, et de sa cousine Daisy et de son mari volage, Tom Buchanan, issu de sang noble. C est ainsi que Nick se retrouve au cœur du monde fascinant des milliardaires, de leurs illusions, de leurs amours et de leurs mensonges. Témoin privilégié de son temps, il se met à écrire une histoire où se mêlent des amours impossibles, des rêves d absolu et des tragédies ravageuses et, chemin faisant, nous tend un miroir où se reflètent notre époque moderne et ses combats. '
        ,
          id: '010'
          title: 'After Earth'
          description : '1000 ans après un cataclysme forçant les humains à quitter la Terre, Nova Prime est devenue la nouvelle planète occupée par notre espèce. Le général Cypher Raige, de retour d’une longue mission, retrouve sa famille (et son rôle de père auprès de Kitai, son fils de 13 ans). Lorsqu une tempête d’astéroïdes endommage le vaisseau de Cypher et Kitai, ils s écrasent sur la Terre, devenue très dangereuse. Alors que son père à l’agonie dans le cockpit, Kitai va devoir entreprendre seul, un voyage en terrain hostile pour retrouver leur balise de détresse. Kitai a toujours voulu être un soldat comme son père. Aujourd hui, il en a l’opportunité.'
        ,
          id: '011'
          title: 'Man of Steel'
          description : 'Superman va devoir affronter deux autres survivants de la planète Krypton, le redoutable Général Zod, et Faora, sa partenaire. '
        ,
          id: '012'
          title: 'Robocop'
          description : 'Les services de police inventent une nouvelle arme infaillible, Robocop, mi-homme, mi-robot, policier électronique de chair et dacier qui a pour mission de sauvegarder la tranquillité de la ville. Mais ce cyborg a aussi une âme... '
        ]

        @render() 

        len = @SlideListe.length - 1
        for x in [0..len]
          slide = new Slide @SlideListe[x]
          @slides.add slide
          slideView = new SlideView 
            model : slide
          
          $('.toSend').append(slideView.render().el)


        $('#sendbt').bind 'click', ()=>
          @envoyer()


      render: ()-> 
        console.log "no rendering yet"

      envoyer:()->
        id = $('input:radio[name=slides]:checked').parent().parent().attr('id');
        if id
          slide= new Slide @slides.get(id)
          @socket.emit('next', slide.toJSON())        
          slideView = new SlideView 
            model : @slides.get(id)
          $('#'+id).parent().remove()
          console.log slideView.render().el
          $('.Sent').append(slideView.render().el)
      



        




