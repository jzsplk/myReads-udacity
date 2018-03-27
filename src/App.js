import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Search from './Search'
import './App.css'



class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books1: [
      { imageLinks: {smallThumbnail:"http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"},
        title: "To Kill a Mockingbird",
        authors: ["Harper Lee"],
        shelf: "currentlyReading"
      },
      { imageLinks: {smallThumbnail:"http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"},
        title: "Ender's Game",
        authors: ["Orson Scott Card"],
        shelf: "currentlyReading"
      },
      { imageLinks: {smallThumbnail:"http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api"},
        title: "1776",
        authors: ["David McCullough"],
        shelf: "wantToRead"
      },
      { imageLinks: {smallThumbnail:"http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api"},
        title: "Harry Potter and the Sorcerer's Stone",
        authors: ["J.K. Rowling"],
        shelf: "wantToRead"
      },
      { imageLinks: {smallThumbnail:"http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api"},
        title: "The Hobbit",
        authors: ["J.R.R. Tolkien"],
        shelf: "read"
      },
      { imageLinks: {smallThumbnail:"http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api"},
        title: "Oh, the Places You'll Go!",
        authors: ["Seuss"],
        shelf: "read"
      },
      { imageLinks: {smallThumbnail:"http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api"},
        title: "The Adventures of Tom Sawyer",
        authors: ["Mark Twain"],
        shelf: "read"
      }

    ],
    books : [],
    searchBooks: [],
    updating: false  
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log('books', books)
      this.setState({books: books})
    })
  }

  componentWillReceiveProps(){
      // Remove the process indicator
      this.setState({
          updating: false
      });
  }

  updateAPIBooks = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      //updage local data
      book.shelf = shelf

      //update the state books
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([ book ])
      }))
      this.setState({
        updating: true
      })
    })
  }

  updateQuery = (query) => {
    if(query) {
      BooksAPI.search(query).then(data => { 
        console.log('search results', data) 
        //检查搜索结果是否在books中，如果在，更新该book的shelf属性
        if(data.length) {
          data.map(book => {
            this.state.books.forEach((b) => {
              if(b.id === book.id) {
                book.shelf = b.shelf
              }
            })
          })
          this.setState({ searchBooks: data })
        }

      })
    } else {
      this.setState( { searchBooks: [] } )
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <div className="search-books">
          { this.state.updating && (<div className="cssload-spin-box"></div>)}
            <Search books={this.state.searchBooks} onUpdateQuery={this.updateQuery} onUpdateBooks={this.updateAPIBooks} />
          </div>
        )} />

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="open-search">
              <Link to="/search" >Add a book</Link>
            </div>
            <BookShelf onUpdateBooks={this.updateAPIBooks} books={this.state.books} />
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
