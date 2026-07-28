package com.musiciq.backend.exception;

public class DuplicateAlbumException extends RuntimeException {
    public DuplicateAlbumException(String message) {
        super(message);
    }
}
