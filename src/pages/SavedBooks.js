import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";

import { REMOVEBOOK } from "../mutations";
import { GETME } from "../queries";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";

export const SavedBooks = () => {
  let userData;

  const [executeRemoveBook] = useMutation(REMOVEBOOK);

  // accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await executeRemoveBook({
        variables: {
          bookId,
        },
      });

      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  const { loading, error, data } = useQuery(GETME);

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  if (error) {
    throw new Error("something went wrong!");
  }

  if (data) {
    userData = data.me;
  }

  return (
    <>
      {userData.savedBooks ? (
        <h1>UserData!</h1>
      ) : (
        <h1>No UserData.savedBooks</h1>
      )}
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteBook(book.bookId)}
                  >
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};
