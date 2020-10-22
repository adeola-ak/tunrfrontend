import React from "react";

const Favorites = (props) => {
	console.log(props);
	const faves = props.favorites;

	let showFavorites = faves.map((fave, index) => {
		return (
			<div className="fav-article">
				<p>{fave.title}</p>
				<p>{fave.artist}</p>
				<p>{fave.time}</p>

				<button onClick={() => props.removeFromFaves(index)}>
					REMOVE TUNE
				</button>
			</div>
		);
	});
	return (
		<div>
			<h1>FAVE TUNES.</h1>
			<div className="favorites">{showFavorites}</div>
		</div>
	);
};
export default Favorites;
