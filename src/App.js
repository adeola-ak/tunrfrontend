import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import { Route, Link, Switch } from "react-router-dom";
import Playlist from "./components/Playlist";
import Favorites from "./components/Favorites";

function App() {
	// url of database
	// change url to deployed site //
	const url = "https://aa-tunr-backend.herokuapp.com";
	// empty song for create
	const emptySong = {
		title: "",
		artist: "",
		time: "",
		favorite: false,
	};
	// State lives here
	const [songs, setSongs] = useState([]);
	const [selectedSong, setSelectedSong] = useState(emptySong);
	const [favorites, setFavorites] = useState([]);

	// Function to Fetch songs
	// match fetch to deployed data //
	const getSongs = () => {
		fetch(url + '/song/')
			.then((response) => response.json())
			.then((data) => {
				setSongs(data);
			});
	};

	const handleFavoritesClick = (favesong) => {
		console.log("Add favorites button clicked!");
		setFavorites([
			...favorites,
			{
				title: favesong.title,
				artist: favesong.name,
				time: favesong.time,
				favorite: true,
			},
		]);
	};

	// get songs on page load
	React.useEffect(() => {
		getSongs();
	}, []);
	// handleCreate for creating songs
	const handleCreate = (newSong) => {
		// match create with deployed data //
		fetch(url + '/song/', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newSong),
		}).then((response) => getSongs());
	};
	//  handleUpdate to edit songs
	const handleUpdate = (song) => {
		// match create with deployed data //
fetch(url + '/song/' + song._id, {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(song),
		}).then((response) => getSongs());
	};
	const removeSong = (song) => {
		// match create with deployed data //
fetch(url + '/song/' + song._id, {
			method: 'delete',
		}).then((response) => getSongs());
  };
  const selectSong = (song) => {
    setSelectedSong(song)
  }
	return (
		<div className="App">
			<h1>TUNR.</h1>
			<h6>FOR ALL YOUR PLAYLIST NEEDS</h6>
			<hr />
			<Playlist
				// {...rp}
				songs={songs}
				selectSong={selectedSong}
				removeSong={removeSong}
				handleFavoritesClick={handleFavoritesClick}
			/>
			<Favorites favorites={favorites} />
      <Switch>
				<Route
					exact
					path="/"
					render={(rp) => (
						<Form
							{...rp}
							label="create"
							song={emptySong}
							handleSubmit={handleCreate}
						/>
					)}
				/>
			</Switch>
		</div>
	);
}

export default App;
