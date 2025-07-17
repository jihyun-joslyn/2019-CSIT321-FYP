package com.project.sharity.dao;

import java.util.List;

import com.project.sharity.key.FavouritesID;
import com.project.sharity.model.Favourites;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface FavouritesDao extends CrudRepository<Favourites, FavouritesID> {
    @Query(value = "SELECT accountID FROM user WHERE userID = :uID", nativeQuery = true)
    String getAccountID(@Param("uID")String uID);

    @Query(value = "SELECT * FROM favourites WHERE accountID IN (SELECT accountID FROM user WHERE userID = :uID) ORDER BY date_added DESC", nativeQuery = true)
    List<Favourites> getFavList(@Param("uID")String userID);

    @Query(value = "SELECT user.userID FROM item INNER JOIN user ON item.sellerID = user.accountID WHERE item.itemID = :pID", nativeQuery = true)
    String getItemSeller(@Param("pID")String pID);

    @Query(value = "SELECT user.userID FROM service INNER JOIN user ON service.sellerID = user.accountID WHERE service.serviceID = :pID", nativeQuery = true)
    String getServiceSeller(@Param("pID")String pID);

    @Query(value = "SELECT item.iName FROM favourites INNER JOIN item ON favourites.productID = item.itemID WHERE favourites.productID = :pID AND favourites.accountID = :uID", nativeQuery = true)
    String getItemName(@Param("pID")String pID, @Param("uID")String uID);

    @Query(value = "SELECT service.sName FROM favourites INNER JOIN service ON favourites.productID = service.serviceID WHERE favourites.productID = :pID AND favourites.accountID = :uID", nativeQuery = true)
    String getServiceName(@Param("pID")String pID, @Param("uID")String uID);

    @Query(value = "SELECT item.price FROM favourites INNER JOIN item ON favourites.productID = item.itemID WHERE favourites.productID = :pID AND favourites.accountID = :uID", nativeQuery = true)
    int getItemPrice(@Param("pID")String pID, @Param("uID")String uID);

    @Query(value = "SELECT service.price FROM favourites INNER JOIN service ON favourites.productID = service.serviceID WHERE favourites.productID = :pID AND favourites.accountID = :uID", nativeQuery = true)
    int getServicePrice(@Param("pID")String pID, @Param("uID")String uID);
	
	@Query(value = "SELECT img FROM photo WHERE productID = :productID", nativeQuery = true)
    String getimg(@Param("productID")String productID);
}