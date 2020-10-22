import React from "react";

const Playlist = (props) => {
  const {songs} = props

  const loaded = () => (
    <div>
      {songs.map((song) => (
        <article>
            <p>{song.title}</p>
            <p>{song.artist}</p>
            <p>{song.time}</p>
            <p>{song.favorite}</p>
            
            {song.favorite === true ?  <i className="far fa-heart"></i> : <i className="fas fa-heart"></i> }
            
            <button onClick={() => {
                props.selectSong(song)        
                props.history.push("/edit")
            }}>
                Edit
            </button>

            <button onClick={() => {
                props.removeSong(song)        
            }}>
                Delete
            </button>

        </article>
      ))}
      </div>
  )

  return songs.length > 0 ? loaded() : <h1>Loading songs...</h1>
  

};

export default Playlist;