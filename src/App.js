import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Playlist from './components/Playlist';
import Favorites from './components/Favorites';

function App() {
	// url of database
	// change url to deployed site //
	const url = 'localhost:3000';
	// empty song for create
	const emptySong = {
		title: '',
		artist: '',
		time: '',
		favorite: false,
	};
	// State lives here
	const [songs, setSongs] = useState([]);
	const [selectedSong, setSelectedSong] = useState(emptySong);
	// Function to Fetch songs
	// match fetch to deployed data //
	const getSongs = () => {
		fetch(url + '/')
			.then((response) => response.json())
			.then((data) => {
				setSongs(data);
			});
	};
	// get songs on page load
	React.useEffect(() => {
		getSongs();
	}, []);
	// handleCreate for creating songs
	const handleCreate = (newSong) => {
		// match create with deployed data //
		fetch(url + '/', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newSong),
		}).then((response) => getSongs());
	};
	//  handleUpdate to edit songs
	const handleUpdate = (song) => {
		// match create with deployed data //
		fetch(url + '/' + song._id, {
			method: 'put',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(song),
		}).then((response) => getSongs());
	};
	const removeSong = (song) => {
		// match create with deployed data //
		fetch(url + '/' + song._id, {
			method: 'delete',
		}).then((response) => getSongs());
	};
	return (
		<div className='App'>
			<h1>TUNR.</h1>
			<h6>FOR ALL YOUR PLAYLIST NEEDS</h6>
			<hr />
			<Switch>
				<Route
					exact
					path='/'
					renderPlaylist={(rp) => (
						<Playlist
							{...rp}
							songs={songs}
							selectSong={selectSong}
							removeSong={removeSong}
						/>
					)}
					renderForm={(rp) => (
						<Form
							{...rp}
							label='create'
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
