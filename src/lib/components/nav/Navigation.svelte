<script lang="ts">
	import Button from './Button.svelte';

	let open = false;
	let handleButtonClick = () => {
		open = !open;
	};
</script>

<Button onClick={handleButtonClick} {open} />
<nav style="--translate-x: -{open ? 350 : 0}px;">
	<ul>
		<li><a on:click={handleButtonClick} href="/">Home</a></li>
	</ul>
</nav>

<style lang="scss">
	$width: 350px;

	nav {
		position: fixed;
		right: -$width;
		transition: transform 0.7s ease-in-out;
		transform: translateX(var(--translate-x));
		top: 0;
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(2px);
		height: 100vh;
		width: $width;
		z-index: 2;

		ul {
			position: relative;
			text-align: right;
			list-style-type: none;
			margin: 70px 50px;
			padding: 0;
			font-size: 2em;

			li {
				margin: 15px 0;

				a,
				a:visited,
				a:active {
					color: #999;
					text-decoration: none;
					transition: 0.1s ease-in-out;
					user-select: none;
					-webkit-tap-highlight-color: transparent;

					&:hover {
						color: #eee;
					}
				}
			}
		}
	}
</style>
