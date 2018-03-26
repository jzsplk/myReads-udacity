import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class Search extends Component {
	state = {
		query: ''
	}


	updateQuery = (query) => {
		if(query) {
			this.props.onUpdateQuery(query.trim())	
		} else {

		}

	}



	render() {
		const { books,onUpdateBooks, backToIndex } = this.props

		return (
			<div className="search-books">
			  <div className="search-books-bar">
			    <a className="close-search" onClick={() => backToIndex}>Close</a>
			    <div className="search-books-input-wrapper">
			      {/*
			        NOTES: The search from BooksAPI is limited to a particular set of search terms.
			        You can find these search terms here:
			        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

			        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
			        you don't find a specific author or title. Every search is limited by search terms.
			      */}
			      <input 
			      	type="text" 
			      	placeholder="Search by title or author"
			      	onChange={(event) => this.updateQuery(event.target.value)}
			      />
			    </div>
			  </div>
			  <div className="search-books-results">
			    <ol className="books-grid">
		        	{books.map(book => (
		        		<li key={book.title}>
		        			<Book book={book} onUpdateBooks={onUpdateBooks} />
		        		</li>
		    		))}
			    </ol>
			  </div>
			</div>
		)
	}
}

export default Search;