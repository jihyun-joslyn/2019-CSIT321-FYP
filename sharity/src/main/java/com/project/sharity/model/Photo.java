package com.project.sharity.model;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.project.sharity.key.PhotoID;

@Entity
@Table(name = "photo")
public class Photo implements Serializable {
    private static final long serialVersionUID = 1L;
    @EmbeddedId
    private PhotoID photoID;

    public Photo() {}

    public Photo(PhotoID photoID){
        this.photoID = photoID;
    }


    /**
     * @return PhotoID return the photoID
     */
    public PhotoID getPhotoID() {
        return photoID;
    }

    /**
     * @param photoID the photoID to set
     */
    public void setPhotoID(PhotoID photoID) {
        this.photoID = photoID;
    }

}