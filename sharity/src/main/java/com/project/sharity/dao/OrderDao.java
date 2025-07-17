package com.project.sharity.dao;

import java.util.Date;
import java.util.List;

import com.project.sharity.key.OrderID;
import com.project.sharity.model.Order;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface OrderDao extends CrudRepository<Order, OrderID> {
 
    @Query(value = "SELECT * FROM orders WHERE accountID = (SELECT accountID FROM user WHERE userID = :uID) and transactionID = :transactionID ORDER BY date_added DESC", nativeQuery = true)
    List<Order> getHisList(@Param("uID")String uID,@Param("transactionID")String transactionID);

	@Query(value = "SELECT userID FROM user WHERE accountID = :uID", nativeQuery = true)
    String getSellerName(@Param("uID")String uID);

	@Query(value = "SELECT iName FROM item WHERE itemID = :pID", nativeQuery = true)
    String getItemName(@Param("pID")String pID);

	@Query(value = "SELECT sName FROM service WHERE serviceID = :pID", nativeQuery = true)
    String getServiceName(@Param("pID")String pID);

	@Query(value = "SELECT price FROM item WHERE itemID = :pID", nativeQuery = true)
    int getItemPrice(@Param("pID")String pID);

    @Query(value = "SELECT price FROM service WHERE serviceID = :pID", nativeQuery = true)
    int getServicePrice(@Param("pID")String pID);
    
    @Query(value = "SELECT transactionID FROM orders WHERE accountID =(select accountID from user where userID =:userID) group by transactionID Order by date_added DESC", nativeQuery = true)
    List<String> getTransList(@Param("userID")String userID);
    
    @Query(value = "SELECT sum(orders.quantity*item.price) FROM orders inner join item On item.itemID=orders.productID where accountID=(select accountID from user where userID =:userID) and orders.transactionID = :transactionID", nativeQuery = true)
    String getTpriceItem(@Param("userID")String userID,@Param("transactionID")String transactionID);
    
    @Query(value = "SELECT sum(service.price) FROM orders inner join service On service.serviceID=orders.productID where accountID=(select accountID from user where userID =:userID) and orders.transactionID = :transactionID", nativeQuery = true)
    String getTpriceService(@Param("userID")String userID,@Param("transactionID")String transactionID);
    
    @Query(value = "SELECT photo.img FROM photo inner join orders On photo.productID=orders.productID where accountID=(select accountID from user where userID =:userID) and orders.transactionID = :transactionID", nativeQuery = true)
    String[] getSomePhoto(@Param("userID")String userID,@Param("transactionID")String transactionID);
    
    @Query(value = "SELECT transactionID FROM orders Group By transactionID Order by date_added DESC LIMIT 15", nativeQuery = true)
	String[] getfirst15();

    @Query(value = "SELECT * FROM orders where transactionID = :transactionID", nativeQuery = true)
    List<Order> getwithtransactionID(@Param("transactionID") String transactionID);
	
	@Query(value = "SELECT img FROM photo WHERE productID = :productID", nativeQuery = true)
    String getimg(@Param("productID")String productID);
	
    @Query(value = "SELECT price FROM item where itemID= :productID", nativeQuery = true)
	int getitemprice(@Param("productID")String productID);
    
    @Query(value = "SELECT price FROM service  where serviceID= :productID", nativeQuery = true)
	int getserviceprice(@Param("productID")String productID);
    
    @Query(value = "SELECT date_added FROM orders where transactionID= :transactionID Limit 1", nativeQuery = true)
 	Date getdate(@Param("transactionID")String transactionID);
}