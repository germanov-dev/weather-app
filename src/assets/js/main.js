window.addEventListener('load', () => {
	let long;
	let lat;

	const weatherSummary = document.querySelector(
		'.weather .weather__summary p'
	);

	const weatherTempSection = document.querySelector(
		'.weather .weather__temp'
	);
	const weatherTemp = document.querySelector(
		'.weather .weather__temp strong'
	);
	const weatherTempC = document.querySelector(
		'.weather .weather__temp span '
	);

	const weatherLocation = document.querySelector(
		'.weather .weather__location'
	);
	const weatherIcon = document.querySelector(
		'.weather .weather__icon canvas'
	);

	const weatherDays = document.querySelectorAll('.daily-weathers .daily-weather__day');
	const weatherMinTemp = document.querySelectorAll('.daily-weathers .daily-weather__temp .min');
	const weatherMaxTemp = document.querySelectorAll('.daily-weathers .daily-weather__temp .max');
	const weatherSummarys = document.querySelectorAll('.daily-weathers .daily-weather__summary');
	const weatherIcons = document.querySelectorAll('.daily-weathers .daily-weather canvas');
	const splashScreen = document.querySelector('.splash-screen');

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/d090ad71e840a71b480a0e2443977dab/${lat},${long}?units=auto `;
			const reverseLocation = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${long}&zoom=18&addressdetails=1`;

			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					// console.log(data);

					setTimeout(function() {
						splashScreen.classList.add('hide');
					}, 1000);

					const { temperature, summary, icon } = data.currently;

					//Set DOM Elements from the API
					weatherTemp.textContent = Math.floor(temperature);
					weatherSummary.textContent = summary;

					//Set Icon
					setIcons(icon, weatherIcon);

					//Change temperature from F to C
					weatherTempSection.addEventListener('click', () => {});

					// console.log(data.daily);

					const a = new Date();
					const days = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
					let dayOfWeek;

					for (let i = 0; i < days.length; i++) {
						let dayOfWeek = days[(a.getDay() + 1 + i) % 7];

						weatherDays[i].textContent = dayOfWeek
					}

					for (let x = 1; x < data.daily.data.length; x++) {
						weatherMinTemp[x - 1].textContent = Math.floor(data.daily.data[x].temperatureLow);
						weatherMaxTemp[x - 1].textContent = Math.floor(data.daily.data[x].temperatureHigh);
						weatherSummarys[x - 1].textContent = data.daily.data[x].summary;
						setIcons(data.daily.data[x].icon, weatherIcons[x - 1]);
					}
				});

			fetch(reverseLocation)
				.then(responseCity => {
					return responseCity.json();
				})
				.then(dataCity => {
					weatherLocation.textContent = `${dataCity.address.city} / ${dataCity.address.country}`;
				})
		});
	}

	function setIcons(icon, iconID) {
		const skycons = new Skycons({ color: 'white' });
		const currentIcon = icon.replace(/-/g, '_').toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});
