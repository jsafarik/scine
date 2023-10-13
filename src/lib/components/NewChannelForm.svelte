<div>
	<h2>New channel form</h2>
	<form>
		<label>
			My email address
			<input title="Provide your email address" placeholder="name@mail.com" type="email" />
		</label>
		<label>
			YouTube username or channel name
			<input
				title="Provide YouTube username to be added"
				placeholder="@youtube-username"
				type="text"
			/>
		</label>
		<label>
			I am the ownew of this channel
			<input title="Are you the owner of this YouTube channel?" type="checkbox" />
		</label>
		<label>
			Additional information
			<textarea
				title="Provide optoinal additional information"
				placeholder="Additional information"
				rows="3"
			/>
		</label>
	</form>
</div>

<style lang="scss">
	div {
		padding: 40px;
		background-color: #222;
		border-radius: 20px;
		width: 500px;
		margin: 0 auto;

		h2 {
			text-align: center;
			margin: 0;
		}

		form {
			display: flex;
			flex-flow: column;

			label {
				display: flex;
				flex-flow: column;
				margin-bottom: 10px;

				input,
				textarea {
					resize: none;
					padding: 5px;
					border-radius: 5px;
					border: 0px;
					outline: none;

					&[type='checkbox'] {
					}
				}
			}
		}
	}
</style>
