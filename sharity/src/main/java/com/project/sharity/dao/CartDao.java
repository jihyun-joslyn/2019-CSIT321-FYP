package com.project.sharity.dao;

import java.util.List;

import javax.transaction.Transactional;

import com.project.sharity.key.CartID;
import com.project.sharity.model.Cart;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface CartDao extends CrudRepository<Cart, CartID> {
    @Query(value = "SELECT * FROM cart WHERE accountID IN (SELECT accountID FROM user WHERE userID = :uID) ORDER BY date_added DESC", nativeQuery = true)
    List<Cart> getCartList(@Param("uID")String userID);

    @Query(value = "SELECT user.userID FROM item INNER JOIN user ON item.sellerID = user.accountID WHERE item.itemID = :pID", nativeQuery = true)
    String getItemSeller(@Param("pID")String pID);
    
    @Query(value = "SELECT photo.img FROM cart INNER JOIN photo On :productID = photo.productID where cart.productID = :productID and accountID=:uID", nativeQuery = true)
    String getimg(@Param("productID")String productID,@Param("uID")String userID);
    
    @Query(value = "select sum(item.price*cart.quantity) from cart inner join item On cart.productID = item.itemID where cart.accountID = :acc", nativeQuery = true)
    Double getitemTPrice(@Param("acc")String acc);
    
    @Query(value = "select sum(service.price) from cart inner join service On cart.productID = service.serviceID  where cart.accountID = :acc", nativeQuery = true)
    Double getserviceTPrice(@Param("acc")String acc);
    
    @Query(value = "SELECT user.userID FROM service INNER JOIN user ON service.sellerID = user.accountID WHERE service.serviceID = :pID", nativeQuery = true)
    String getServiceSeller(@Param("pID")String pID);

    @Query(value = "SELECT item.iName FROM cart INNER JOIN item ON cart.productID = item.itemID WHERE cart.productID = :pID AND cart.accountID = :uID", nativeQuery = true)
    String getItemName(@Param("pID")String pID, @Param("uID")String uID);

    @Query(value = "SELECT service.sName FROM cart INNER JOIN service ON cart.productID = service.serviceID WHERE cart.productID = :pID AND cart.accountID = :uID", nativeQuery = true)
    String getServiceName(@Param("pID")String pID, @Param("uID")String uID);

    @Query(value = "SELECT item.price FROM cart INNER JOIN item ON cart.productID = item.itemID WHERE cart.productID = :pID AND cart.accountID = :uID", nativeQuery = true)
    int getItemPrice(@Param("pID")String pID, @Param("uID")String uID);

    @Query(value = "SELECT price FROM service WHERE serviceID = :pID", nativeQuery = true)
    int getServicePrice(@Param("pID")String pID);

    @Query(value = "SELECT accountID FROM user WHERE userID = :uID", nativeQuery = true)
    String getAccountID(@Param("uID")String uID);
    
    @Modifying@Transactional 
    @Query(value = "DELETE FROM cart WHERE accountID = (SELECT accountID FROM user WHERE userID = :userID)", nativeQuery = true)
    int deleteAllCart(@Param("userID")String userID);
    
    @Query(value = "SELECT sellerID FROM cart inner join item On cart.productID = item.itemID WHERE productID = :productID and accountID=(select accountID from user where userID=:userID)", nativeQuery = true)
    String tryfromitem(@Param("productID")String productID,@Param("userID")String userID);
    
    @Query(value = "SELECT sellerID FROM cart inner join service On cart.productID = service.serviceID WHERE productID = :productID and accountID=(select accountID from user where userID=:userID)", nativeQuery = true)
    String tryfromservice(@Param("productID")String productID,@Param("userID")String userID);
    
    @Modifying@Transactional 
    @Query(value = "INSERT INTO orders(transactionID,accountID, productID,quantity, sellerID, date_added) VALUES (:paymentID,:accountID,:productID,:quantity,:sellerID,NOW())", nativeQuery = true)
    int insertorder(@Param("paymentID")String paymentID,@Param("accountID")String accountID,@Param("productID")String productID,@Param("quantity")int quantity,@Param("sellerID")String sellerID);
    
    @Modifying@Transactional 
    @Query(value = "UPDATE cart SET quantity=:amount WHERE productID = :ItemID and accountID=(select accountID from user where userID =:userID)", nativeQuery = true)
    int changeamount(@Param("amount")int amount,@Param("ItemID")String ItemID,@Param("userID")String userID);
    
    @Query(value = "SELECT quantity FROM item WHERE itemID = :ItemID", nativeQuery = true)
    int checkcanadd(@Param("ItemID")String ItemID);
    
    @Modifying@Transactional
    @Query(value = "UPDATE item SET quantity=:quantity WHERE itemID = :pID", nativeQuery = true)
    int  changeQuantity(@Param("quantity")int quantity,@Param("pID")String pID);
    
    @Query(value = "SELECT iName FROM item WHERE itemID = :productID ", nativeQuery = true)
    String getitemname(@Param("productID")String productID);
    
    @Query(value = "SELECT sName FROM service WHERE serviceID = :productID ", nativeQuery = true)
    String getservicename(@Param("productID")String productID);
    
    @Query(value = "SELECT email FROM user WHERE accountID = :accountID ", nativeQuery = true)
    String getselleremail(@Param("accountID")String accountID);
    
    @Query(value = "SELECT email FROM user WHERE userID = :userID ", nativeQuery = true)
    String getbuyeremail(@Param("userID")String userID);
    
    @Query(value = "SELECT phone FROM user WHERE userID = :userID ", nativeQuery = true)
    String getbuyerphone(@Param("userID")String userID);
    
    @Query(value = "SELECT orders.sellerID FROM orders inner join item on orders.productID=item.itemID WHERE orders.accountID = (select accountID from user where userID=:userID) and orders.productID=:productID and orders.transactionID=:paymentID", nativeQuery = true)
    String getitemsellerID(@Param("productID")String productID,@Param("userID")String userID,@Param("paymentID")String paymentID);
    
    @Query(value = "SELECT orders.sellerID FROM orders inner join service on orders.productID=service.serviceID WHERE orders.accountID = (select accountID from user where userID=:userID) and orders.productID=:productID and orders.transactionID=:paymentID", nativeQuery = true)
    String getservicesellerID(@Param("productID")String productID,@Param("userID")String userID,@Param("paymentID")String paymentID);
    
    @Query(value = "SELECT sellerID FROM item WHERE itemID=:productID", nativeQuery = true)
    String emailtryitem(@Param("productID")String productID);
    
}