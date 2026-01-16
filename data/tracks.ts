// audio files

// audio thumbnails

export const tracks = [
  {
    title: '',
    src: "",
    author: '',
    thumbnail: ''
  },
  // ...
];

export const fetchTracks = async (movieId: string) => {
  try {
    const response = await fetch(`https://advanced-internship-api-production.up.railway.app/movies/${movieId}`);
    const data = await response.json();
    
    if (data.data) {
      return [{
        title: data.data.title,
        src: data.data.audioLink,
        author: data.data.director,
        thumbnail: data.data.imageLink
      }];
    }
    return [];
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return [];
  }
};