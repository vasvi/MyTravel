import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesMockService {

  private placesMockData = {
	"html_attributions": [],
	"result": {
		"address_components": [{
				"long_name": "Jaipur",
				"short_name": "Jaipur",
				"types": ["locality", "political"]
			},
			{
				"long_name": "Jaipur",
				"short_name": "Jaipur",
				"types": ["administrative_area_level_2", "political"]
			},
			{
				"long_name": "Rajasthan",
				"short_name": "RJ",
				"types": ["administrative_area_level_1", "political"]
			},
			{
				"long_name": "India",
				"short_name": "IN",
				"types": ["country", "political"]
			}
		],
		"adr_address": "\u003cspan class=\"locality\"\u003eJaipur\u003c/span\u003e, \u003cspan class=\"region\"\u003eRajasthan\u003c/span\u003e, \u003cspan class=\"country-name\"\u003eIndia\u003c/span\u003e",
		"formatted_address": "Jaipur, Rajasthan, India",
		"geometry": {
			"location": {
				"lat": ()=>{return 26.9124336},
				"lng": ()=>{return 75.7872709},
			},
			"viewport": {
				"northeast": {
					"lat": 27.0206722,
					"lng": 75.94119069999999
				},
				"southwest": {
					"lat": 26.7497493,
					"lng": 75.63992500000001
				}
			}
		},
		"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
		"id": "a041fe2980bee4df40bc0780f4c939e7190527c6",
		"name": "Jaipur",
		"photos": [{
				"height": 2752,
				"html_attributions": [
					"\u003ca href=\"https://maps.google.com/maps/contrib/105923442033889051352\"\u003eJitendra Chhapola\u003c/a\u003e"
				],
				"photo_reference": "CmRaAAAAxzfbob8zwb0kZ3C2qtAmtz92tjnd3IAbXHLn1AgQcPFlU32ItwveKfGlzVdRiwjI74BV6b3wB15gP6_MXXTPhaAZ6QjqUpMy3OW3Vs-sPbGTfT7CbnsxRo9r0p7ht83TEhCrb0m7licdVNt1NZo998gHGhSe6UVOiWEdJgzK8b4yuw3-34WgSw",
				"raw_reference": {
					"fife_url": "https://lh3.googleusercontent.com/p/AF1QipNQhlRUOSIIeiJc5Y8KpLCqwUEKLFOXLDzZ70-f=k"
				},
                "width": 4896,
                getUrl: ()=>{return "https://lh3.googleusercontent.com/p/AF1QipNQhlRUOSIIeiJc5Y8KpLCqwUEKLFOXLDzZ70-f=k"}
			},
			{
				"height": 2821,
				"html_attributions": [
					"\u003ca href=\"https://maps.google.com/maps/contrib/108445140853084590283\"\u003eKaran Lakhmani\u003c/a\u003e"
				],
				"photo_reference": "CmRaAAAADF9DUeWGz5TBQYWxnaxzLvfGhlaScMpWLsvTpjs8VaivmIbyJ2cYtR0Ll7azd80wrHm_eQTvP5ojdV-qIRLorCeA_oTuW-xYlCjajB2VI3uUEVJcBM62IQOHXin6neLwEhDDIfcvgIuuMSWCkzofIpPDGhTiaQrKV5D9kqyQCm1qAVNBbcmucQ",
				"raw_reference": {
					"fife_url": "https://lh3.googleusercontent.com/p/AF1QipOs9iNu_M19G4wLNzcPMeh0QgPREfMO-buKx2Cy=k"
				},
                "width": 3761,
                getUrl: ()=>{return "https://lh3.googleusercontent.com/p/AF1QipOs9iNu_M19G4wLNzcPMeh0QgPREfMO-buKx2Cy=k"}
			},
			{
				"height": 4000,
				"html_attributions": [
					"\u003ca href=\"https://maps.google.com/maps/contrib/109774188077291246649\"\u003eGaurav Sureliya\u003c/a\u003e"
				],
				"photo_reference": "CmRaAAAAHwYpTpBQhIuDkl59sYYYDndhXqx6r7t25NUlgISxChqlUGl_V7IdfZtmF8TZ17GKDEENYh504QUoFW5vZ4HU73BQ2jS0uu4O5l2KlFWWyvgTASX1vAz54pb_EOEJ20QjEhA2ur76Cu0sIMxTgDIiRUoBGhRgNgmcKPQr-R0-Wg0bbSfrRsRRrQ",
				"raw_reference": {
					"fife_url": "https://lh3.googleusercontent.com/p/AF1QipOJ2OGrtlFE2cQxkzLVBxHHRl5Af9VYhq6uG6a0=k"
				},
                "width": 6000,
                getUrl: ()=>{return "https://lh3.googleusercontent.com/p/AF1QipOJ2OGrtlFE2cQxkzLVBxHHRl5Af9VYhq6uG6a0=k"}
			},
			{
				"height": 1366,
				"html_attributions": [
					"\u003ca href=\"https://maps.google.com/maps/contrib/106603911677403342266\"\u003eJigar Rathod\u003c/a\u003e"
				],
				"photo_reference": "CmRaAAAA4UhdKeG7Ts6Sn7REYA9BErHMDeKryHRwxUHGsGQzzPrR8YflkZ9hIyzo9zPkhV_h6wBvNSS11LiolM9qrnNFJiWNK508xVglWzReGJfCnjdPrNM5bG1kXhdlXJu79BiGEhCZWs0WRl-6jEWRXhnKfDkuGhRMrlevlax-yMMhQcN6Oo24B69m1Q",
				"raw_reference": {
					"fife_url": "https://lh3.googleusercontent.com/p/AF1QipNzeCgrszJIYt7hpFRxffo6FMjID1cuCc7Rv5zt=k"
				},
                "width": 2048,
                getUrl: ()=>{return "https://lh3.googleusercontent.com/p/AF1QipNzeCgrszJIYt7hpFRxffo6FMjID1cuCc7Rv5zt=k"}
			},
			{
				"height": 1177,
				"html_attributions": [
					"\u003ca href=\"https://maps.google.com/maps/contrib/110099656652851556309\"\u003edev raj\u003c/a\u003e"
				],
				"photo_reference": "CmRaAAAA3Et1YH0cyVV9A5uDLCpMLd_fpcK4swU1jlPy4yjNwfDdCNWrT3xxsFc6g-EX-SISua0K59naAgQNw0lMC79VV4vjxKx8IbnDWkskvXOLyZdTl_P3a7jL2M10OoZ1vFsAEhBg-gTWCcAE0lvSah8u7dgUGhT2OECP1FCAish2UApWRUmraa-_MA",
				"raw_reference": {
					"fife_url": "https://lh3.googleusercontent.com/p/AF1QipOisf_V1pLVJ2K5lhFqdf2pRVeU85VE69CAdDwr=k"
				},
                "width": 1600,
                getUrl: ()=>{return "https://lh3.googleusercontent.com/p/AF1QipOisf_V1pLVJ2K5lhFqdf2pRVeU85VE69CAdDwr=k"}
			},
			{
				"height": 533,
				"html_attributions": [
					"\u003ca href=\"https://maps.google.com/maps/contrib/108551239308814641278\"\u003eJitendra Kumar Sharma\u003c/a\u003e"
				],
				"photo_reference": "CmRaAAAAehi7JkmrGn_J5xBPRjzVylpsg-YYZs3Mzkx-TXTPhUp3DK9b3lwuwcT1n23PFzyuUF-7eO1CItkqB9uTGAKKNEXNHwp4ZDSzLzUAVtBz6lrGObzXue0-KHF-Epke-t7PEhAhNFpeUQfR2FqeSKCPHSqgGhQ4eUkMYL7hi_RjYY-udI6uzLPLjQ",
				"raw_reference": {
					"fife_url": "https://lh3.googleusercontent.com/p/AF1QipPHbkk_fucGSHNEHn60FK13fpU5jtIvI2Eiunih=k"
				},
                "width": 800,
                getUrl: ()=>{return "https://lh3.googleusercontent.com/p/AF1QipPHbkk_fucGSHNEHn60FK13fpU5jtIvI2Eiunih=k"}
			},
			{
				"height": 400,
				"html_attributions": [
					"\u003ca href=\"https://maps.google.com/maps/contrib/117836858341712453583\"\u003ePrem Swami\u003c/a\u003e"
				],
				"photo_reference": "CmRaAAAA8n7FFpHGPVUYXdupdFhkExiIMpm_n0AAC5Kp-FPnKGk0YlJVOiUK4nDjjZn-t0-p03GZoTpT9mK4vFNUnCct9-rLP_2FbWgD9iixBQyNaOXITdec1_uwEfCJdLlg55c4EhCAdxYaU8L4KXkBm5Glbtl7GhQljrjXOv2UViZs5bz5BBg91ZZV0w",
				"raw_reference": {
					"fife_url": "https://lh3.googleusercontent.com/p/AF1QipNsjTfRvEgQ4Fv1mY0kTltzyNvAiu42oqFHNO-b=k"
				},
                "width": 533,
                getUrl: ()=>{return "https://lh3.googleusercontent.com/p/AF1QipNsjTfRvEgQ4Fv1mY0kTltzyNvAiu42oqFHNO-b=k"}
			},
			{
				"height": 1136,
				"html_attributions": [
					"\u003ca href=\"https://maps.google.com/maps/contrib/102202787452710537201\"\u003eDeepak Tak Photography\u003c/a\u003e"
				],
				"photo_reference": "CmRaAAAAxRKP5GYbaS_T9rbauEOdjUjQtxFauueFo5gHLz-hquO3AYY2VVijSsLMChobgD4EDECb8eev0QQulxQ7XiSiadfIoc9xT5wszHsw6qXIG__3smvTo_uG0hJriWuGQkLWEhDug_s_OcN-jMA1IQ__q6SEGhSjBRyTQR35rgQe7Gqp_H65dPnouQ",
				"raw_reference": {
					"fife_url": "https://lh3.googleusercontent.com/p/AF1QipM3vsy-a-37e7vk342jfLsD5tyxab50HNHVomyO=k"
				},
                "width": 3200,
                getUrl: ()=>{return "https://lh3.googleusercontent.com/p/AF1QipM3vsy-a-37e7vk342jfLsD5tyxab50HNHVomyO=k"}
			},
			{
				"height": 3605,
				"html_attributions": [
					"\u003ca href=\"https://maps.google.com/maps/contrib/108997297894399704489\"\u003elienyuan lee\u003c/a\u003e"
				],
				"photo_reference": "CmRaAAAAAN230L1xTdebQQUmxc4lzf1pPstI0kQoWIgy0x7-Fr6Ucj3hENXNYV1_WEmsXiG3W6INGRCzz4BTrfQQApnnB5GrrEmtrKnJODoX6ItTlIimz4arFDtctXp3eeRG49mUEhAiNoHkZriRaTOladb3g3FjGhQOb1kWkN1qDLZKE2HSDV90UaZ26w",
				"raw_reference": {
					"fife_url": "https://lh3.googleusercontent.com/p/AF1QipMP-Bp5t2sOLXEjEVB9g2ff6ycZ7ogiUlWDKwsu=k"
				},
                "width": 5532,
                getUrl: ()=>{return "https://lh3.googleusercontent.com/p/AF1QipMP-Bp5t2sOLXEjEVB9g2ff6ycZ7ogiUlWDKwsu=k"}
			},
			{
				"height": 1200,
				"html_attributions": [
					"\u003ca href=\"https://maps.google.com/maps/contrib/110122898307424819760\"\u003eMarc Debus\u003c/a\u003e"
				],
				"photo_reference": "CmRaAAAA-xoz6gWxQgyNIaHr6TuTweRt_3mxCozvlI0LMZxGJsMmTPQW2seIiZQzaPhsVWVr4YMy03Fyl8vF5XdypQekgO7GzSLrRTs_pUb9PTmPINZvD2HyLM4_zm1UdbuOJG6sEhBOK-CjTYBbGAX845gzUbiNGhS633IVw2hsa5HT39uTM0zf0K-1BA",
				"raw_reference": {
					"fife_url": "https://lh3.googleusercontent.com/p/AF1QipPE6lO0M22uBWyKlZ6TgwPOxpuvA5YDSqJOIVmZ=k"
				},
                "width": 1600,
                getUrl: ()=>{return "https://lh3.googleusercontent.com/p/AF1QipPE6lO0M22uBWyKlZ6TgwPOxpuvA5YDSqJOIVmZ=k"}
			}
		],
		"place_id": "ChIJgeJXTN9KbDkRCS7yDDrG4Qw",
		"reference": "ChIJgeJXTN9KbDkRCS7yDDrG4Qw",
		"scope": "GOOGLE",
		"types": ["locality", "political"],
		"url": "https://maps.google.com/?q=Jaipur,+Rajasthan,+India&ftid=0x396c4adf4c57e281:0xce1c63a0cf22e09",
		"utc_offset": 330,
		"vicinity": "Jaipur",
		"website": "http://www.jaipur.nic.in/"
	},
	"status": "OK"
};

  getMockData() {
    return this.placesMockData;
  }

}
