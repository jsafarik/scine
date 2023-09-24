<script>
	import { onMount } from 'svelte';
	import 'vanilla-cookieconsent';
	import 'vanilla-cookieconsent/dist/cookieconsent.css';

	onMount(() => {
		if (!document.querySelector('#cc--main')) {
			window.cc = window.initCookieConsent();
			window.cc.run({
				current_lang: 'en',
				autoclear_cookies: true,
				page_scripts: true,

				gui_options: {
					consent_modal: {
						layout: 'cloud',
						position: 'bottom center',
						transition: 'zoom'
					},
					settings_modal: {
						layout: 'box',
						transition: 'zoom'
					}
				},

				onFirstAction: function () {
					console.log('onFirstAction fired');
				},

				onAccept: function (cookie) {
					console.log('onAccept fired ...');
				},

				onChange: function (cookie, changed_preferences) {
					console.log('onChange fired ...');
				},

				languages: {
					en: {
						consent_modal: {
							title: 'We use cookies!',
							description:
								'Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. <button type="button" data-cc="c-settings" class="cc-link">Let me choose</button>',
							primary_btn: {
								text: 'Accept all',
								role: 'accept_all'
							},
							secondary_btn: {
								text: 'Reject all',
								role: 'accept_necessary'
							}
						},
						settings_modal: {
							title: 'Preferences',
							save_settings_btn: 'Save settings',
							accept_all_btn: 'Accept all',
							reject_all_btn: 'Reject all',
							close_btn_label: 'Close',
							cookie_table_headers: [
								{ col1: 'Name' },
								{ col2: 'Domain' },
								{ col3: 'Expiration' },
								{ col4: 'Description' }
							],
							blocks: [
								{
									title: 'Cookie usage',
									description:
										'I use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want.'
								},
								{
									title: 'Strictly necessary cookies',
									description:
										'These cookies are essential for the proper functioning of this website. Without these cookies, the website would not work properly',
									toggle: {
										value: 'necessary',
										enabled: true,
										readonly: true
									}
								},
								{
									title: 'More information',
									description:
										'For any queries in relation to this policy on cookies and your choices, please <a class="cc-link" href="TODO">contact me</a>.'
								}
							]
						}
					}
				}
			});
		}
	});
</script>
