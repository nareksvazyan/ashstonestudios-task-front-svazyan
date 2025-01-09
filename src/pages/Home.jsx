import React, { useState, useEffect } from 'react';
import Header from '../components/header/Header';
import Post from '../components/post/Post';
import './Home.css'

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://cloud.codesupply.co/endpoint/react/data.json')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setPosts(data)
            });
    }, []);

    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://cloud.codesupply.co/endpoint/react/data.json');
            const data = await response.json();
    
            let filteredResults = data;
            if (searchQuery.trim() !== '') {
              filteredResults = data.filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
              );
            }
            
            setPosts(filteredResults);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [searchQuery]);
    
      const handleInputChange = event => {
        setSearchQuery(event.target.value);
      };


    return (
        <div className='home'>
            <Header handleChange={handleInputChange} query={searchQuery} />
            <div className="posts_container">
                {posts.map((item, index) => (
                    <Post key={index} item={item} />
                ))}
            </div>
        </div>
    );
}
