<div>
	<slot />
</div>

<style lang="scss">
	div {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr)); // prevent blowout with minmax
		gap: 20px;
		place-items: center;
	}

	@media only screen and (max-width: 1300px) {
		div {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media only screen and (max-width: 650px) {
		div {
			grid-template-columns: repeat(1, minmax(0, 1fr));
		}
	}
</style>
