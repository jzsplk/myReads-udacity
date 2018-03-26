import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [
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
    books1 : [],
    searchBooks: []  
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({books1: books})
    })
  }

  updateBooks = (book, shelf) => {
    this.setState((state) => ({
      books: state.books.map((b) => ( b.title === book.title ? {
        imageLinks: b.imageLinks,
        title: b.title,
        authors: b.authors,
        shelf: shelf
      } : {
        imageLinks: b.imageLinks,
        title: b.title,
        authors: b.authors,
        shelf: b.shelf
      }))
    }))
  }

  updateAPIBooks = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      //updage local data
      book.shelf = shelf

      //update the state 
      this.setState(state => ({
        book1: state.books1.filter(b => b.id !== book.id).concat([ book ])
      }))
    })
  }

  updateQuery = (query) => {
    BooksAPI.search(query).then(data => { 
      console.log(data) 
      this.setState({searchBooks: data})
    })
  }

  backToIndex = () => {
    this.setState({ showSearchPage: false })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <Search books={this.state.searchBooks} onUpdateQuery={this.updateQuery} onUpdateBooks={this.updateAPIBooks} backToIndex={this.backToIndex} />
          </div>

        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
            <BookShelf onUpdateBooks={this.updateAPIBooks} books={this.state.books1} />


          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
