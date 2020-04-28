export const GoogleDataMock = {
  maps: {
    LatLng: function () {

    },
    Map: function () {
      return {
        setCenter: function () {

        }
      };
    },
    places: {
      Autocomplete: function (element) {
        this.getPlace = () => {
          return JSON.parse(JSON.stringify({
            address_components: [{
              long_name: 'Noida',
              short_name: 'Noida',
              types: ['locality', 'political']
            }, {
              long_name: 'Gautam Buddh Nagar',
              short_name: 'Gautam Buddh Nagar',
              types: ['administrative_area_level_2', 'political']
            }, {
              long_name: 'Uttar Pradesh',
              short_name: 'UP',
              types: ['administrative_area_level_1', 'political']
            }, {long_name: 'India', short_name: 'IN', types: ['country', 'political']}],
            adr_address: '<span class="locality">Noida</span>,<span class="region">Uttar Pradesh</span>,<span class="country-name">India</span>',
            formatted_address: 'Noida, Uttar Pradesh, India',
            geometry: {
              location: {lat: 28.5355161, lng: 77.3910265},
              viewport: {south: 28.397206, west: 77.2936967, north: 28.6363011, east: 77.50256329999999}
            },
            icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
            id: '4838d8e111df81c1f66479871208c0afc03e657d',
            name: 'Noida',
            photos: [{
              height: 768,
              html_attributions: ['<a href="https://maps.google.com/maps/contrib/113860657786379706054">Venkatesh Bhat</a>'],
              width: 1024
            }, {
              height: 621,
              html_attributions: ['<a href="https://maps.google.com/maps/contrib/116339547022326993172">arvind kumar</a>'],
              width: 735
            }, {
              height: 3024,
              html_attributions: ['<a href="https://maps.google.com/maps/contrib/105784490073967401958">Siddharth Kardam</a>'],
              width: 4032
            }, {
              height: 3120,
              html_attributions: ['<a href="https://maps.google.com/maps/contrib/115459302801745116757">Rakesh Kumar</a>'],
              width: 4160
            }, {
              height: 394,
              html_attributions: ['<a href="https://maps.google.com/maps/contrib/100923482555300293907">Funky Amit</a>'],
              width: 778
            }, {
              height: 2736,
              html_attributions: ['<a href="https://maps.google.com/maps/contrib/116229981104704942230">Ashish Saini</a>'],
              width: 3648
            }, {
              height: 3024,
              html_attributions: ['<a href="https://maps.google.com/maps/contrib/107431011022399597526">Shwet Kumar</a>'],
              width: 4032
            }, {
              height: 547,
              html_attributions: ['<a href="https://maps.google.com/maps/contrib/100068170437916889514">Shloka Sharma</a>'],
              width: 835
            }, {
              height: 838,
              html_attributions: ['<a href="https://maps.google.com/maps/contrib/100145096851934740288">Alok S</a>'],
              width: 1404
            }, {
              height: 2448,
              html_attributions: ['<a href="https://maps.google.com/maps/contrib/104199291664368182675">Camera Girl Harshita</a>'],
              width: 3264
            }],
            place_id: 'ChIJezVzMaTlDDkRP8B8yDDO_zc',
            reference: 'ChIJezVzMaTlDDkRP8B8yDDO_zc',
            scope: 'GOOGLE',
            types: ['locality', 'political'],
            url: 'https://maps.google.com/?q=Noida,+Uttar+Pradesh,+India&ftid=0x390ce5a43173357b:0x37ffce30c87cc03f',
            utc_offset: 330,
            vicinity: 'Noida',
            html_attributions: [],
            utc_offset_minutes: 330
          }));
        };
        return this;
      },
      PlacesService: function () {
        return {
          getDetails: function () {

          },
          nearbySearch: function (params, callback) {
            const responseObject = [{
              'business_status': 'OPERATIONAL',
              'geometry': {
                'location': {lat: () => 28.62705470000001, lng: () => 77.21662669999999},
                'viewport': {'south': 28.6263675197085, 'west': 77.2152654697085, 'north': 28.6290654802915, 'east': 77.2179634302915}
              },
              'icon': 'https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png',
              'id': '748ac99421aea698e9b794464dbec3798d7251ba',
              'name': 'Jantar Mantar',
              'opening_hours': {'open_now': false},
              'photos': [{
                'height': 2268,
                'html_attributions': ['<a href="https://maps.google.com/maps/contrib/114042331138824601540">Subhransu Sekhar Nayak</a>'],
                'width': 4032,
                getUrl: () => {

                }
              }],
              'place_id': 'ChIJm8RPaUr9DDkRDBt4YsluSqI',
              'plus_code': {'compound_code': 'J6G8+RM New Delhi, Delhi, India', 'global_code': '7JWVJ6G8+RM'},
              'rating': 4.1,
              'reference': 'ChIJm8RPaUr9DDkRDBt4YsluSqI',
              'scope': 'GOOGLE',
              'types': ['tourist_attraction', 'point_of_interest', 'establishment'],
              'user_ratings_total': 20354,
              'vicinity': 'Connaught Place, Sansad Marg, New Delhi',
              'html_attributions': []
            }];
            callback(responseObject, 'OK');
          }
        };
      },
      PlacesServiceStatus: {
        OK: 'OK'
      }

    },
    event: {
      addListener: (param, eventName, callback) => {
        callback();
      }
    },
    GeocoderStatus: {
      OK: 'OK'
    },
    Animation: {
      DROP: ''
    },
    Size: function () {

    },
    Marker: function () {

      return {
        addListener: function (type, callback) {
          callback();
        }
      };
    },
    InfoWindow: function () {
      return {
        open: function () {

        }
      };

    }
  }
};

export const locationObject = {
  name: 'Noida',
  formatted_address: 'Noida, Uttar Pradesh, India',
  photos: ['https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAArtTHx9srDB3v9ILSWKnr0VeraBRrNAfKHl2oHvIQcRX_HG0Re_gs3NdwjQ1rikJot1yNbidygA9pPRr1VLi-apOhI4fmoImyK-iWzoc4SYg9YvE9cXOWbUTxrGd3RexmEhAweLKp8n8svHsiVmMNbtYnGhSXo4g1nkuVHESxN9A2npEUUFoLhA&3u1024&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=122917', 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAxRwgaawpFqaAQuepJpJlkxjDEXHFSaLkmeR45aD-ueZ4PyZW8eQ515ZaGYyKZgS57Ykqto9CayYHWjKl7QqZCQhO4-McFo3Nl9fmk9yIRHVCrx4oHeeL4VF09kJnNY9QEhAnkbymq3HqvuKFo0hcZZBRGhTrcFT2XtLNyxSrJmLDKc40MAtXxA&3u735&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=119907', 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAA8qkSejiWU9BkST77AMD_1OjWxcU8BgNPOWPFjRxQvQFtuOvyOYrYICdScuC_bfsQKY5ZGOIV5eNqzqdWWCx6LcJY5-9D63sHpgXnEB3HZFZoC6VMY7Mrg-L6q1YAvnrrEhArNk9VrXW-suu2ydwSMvzuGhR3RCXcXCpeEq1fjS2OFEDb1lPQpA&3u4032&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=33299', 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAXhxxxKIXQ3FOvuZJ_nXIDQAIQYTRuUGQXwORKrwnJVgTjXCvLigTo40qDE8brEhBVISwjLQD5fMhgp7ZAqhWe0kubj9yjQ7vRgO11P8-mkwnc6UERmUPzdqyaIXyPfHWEhDGpb-Ebtkcnj-4pl_JD4AsGhTWYFLDcxVx40iMmCPxqAh4Ug9EzQ&3u4160&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=125752', 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAxFuGEOrQMHCnb-iiks01o0J3e-o8C5QMxOjieE-vluO_535eZXKER7e3M-P2jB1QTLrg7cGqt6Ijq2E0hhcQ0mdUA1st-l-axtCqwONh-cUvIsen6KcRNQ48VlvdLesQEhBWxp5YPHRP0XjFnHZLe8cfGhQszHuLonQiy4iS9Wm-xxf2mMz1HQ&3u778&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=31474', 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAALw_Zllpl5vBfXFOJu0tVYX3bkKjIElZA5Binp1l1_4WdlI6edulMYslLkuhKv4hmb2sxKPROfKB9k8Va69XxP7vPNiq4oWaVGuXcFtYpQYK0GFplTZ6bSJlnDPAPHg7kEhBNw0XbEoVoE38HktKgHgYlGhSMLgZPajsryY8ap32eeKrKxtQp0Q&3u3648&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=67137', 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAQjTdn3a2Mm88PW6AGQx4PdRfzvYogQVldQDJN4y4vHgZ9MHJDe9oqipv_-g115of-jWH_ygIZvf4CERda2PgL57GPojZRVklrWAop3i57DmXBhz3N6wgYh9PhiwzVbMDEhDrMUEjWzlXFO0_OZw9zzhPGhR8QeEBz_BOGrzsxgm8rxUl716knQ&3u4032&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=43868', 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAxCU7mWo_du2jl6JRfG9cEw5g2yWtsUbLCVlBVtt77R4kIPMR__fgs3aUVt6hFdBASB0QRLSFaINKQ0J0ay6uuOll9_LuvJgdTsb4xaZEUdbyszWj8MRonSq6AqVJAoXBEhAtOq_ORW0aPTJd3evAkCfSGhRsVJ6e7jjean21_VpijX39ATCokw&3u835&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=53331', 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAANzb_CadGoTsrxJJIvvWorgIPrgGrbClKoX6x7gYG_3_6vzh8G0-r_73ynqaE05NEEYaZWUzBBL2IHGm1_lbis0ROgqjttJ7nTdWBo8tMc7nbQ1F3-IWOX-XjRg8-5_WQEhB1ePuJ9w_tCPbv-oukRxr4GhSHnnJvP5xoPyAigY8cICPzaBe0TA&3u1404&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=6455', 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAVXeevSe2rHzMpmoGG6gYDdecCP2RXD48Utqjy_cOpOSpdPe4TKjSFkN23VcFP3bl8sGsEzDm_Gx3fPFKbLf-WL7xzjTvLjCII9lybztBokXjsxmb3w3HLAAhdZci8sN4EhAGLzNpD9kjs9g7QdRkKRbfGhT62u6JiXxpaK213ku4aIpt10adYQ&3u3264&5m1&2e1&callback=none&key=AIzaSyCoyLacmAqoMKFecnjIHN6rOguWXmZfruo&token=111955'],
  id: '4838d8e111df81c1f66479871208c0afc03e657d',
  place_id: 'ChIJezVzMaTlDDkRP8B8yDDO_zc',
  reference: 'ChIJezVzMaTlDDkRP8B8yDDO_zc',
  geometry: [28.5355161, 77.3910265]
};
