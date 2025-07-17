package com.project.sharity.dao;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import com.project.sharity.model.Admin;
import com.project.sharity.model.Order;

public interface AdminDao extends CrudRepository<Admin, String> {
    
    @Query(value = "SELECT * FROM admin where type = 'item'", nativeQuery = true)
    List<Admin> getAllItem();
    
    @Query(value = "SELECT * FROM admin where type = 'service'", nativeQuery = true)
    List<Admin> getAllService();
    
    @Query(value = "SELECT * FROM admin WHERE productID = :pID", nativeQuery = true)
    Admin getItemDetail(@Param("pID")String pID);
    
    @Query(value = "SELECT sub_category.cName FROM admin INNER JOIN sub_category ON admin.cID = sub_category.subCID WHERE sub_category.subCID = :cID AND admin.productID = :pID", nativeQuery = true)
    String getCategoryName(@Param("cID")String cID, @Param("pID")String pID);
    
    @Query(value = "SELECT photo.img FROM admin INNER JOIN photo On :productID = photo.productID where admin.productID = :productID", nativeQuery = true)
    String getitemimg(@Param("productID")String productID);
    
    @Query(value = "SELECT user.userID FROM admin INNER JOIN user ON admin.sellerID = user.accountID WHERE admin.productID = :pID AND user.accountID = :uID", nativeQuery = true)
    String getSellerName(@Param("pID")String pID, @Param("uID")String uID);
    
    @Query(value = "SELECT description FROM admin WHERE productID = :productID", nativeQuery = true)
    String  getDescription(@Param("productID")String productID);
    
    @Modifying@Transactional
    @Query(value = "INSERT INTO item (itemID, cID, iName, description, sellerID, price, quantity, date_added) values (:itemID, :cID, :iName, :description, :sellerID, :price, 0, :date_added)", nativeQuery = true)
    int  insertBackToItem(@Param("itemID")String itemID,@Param("cID")String cID,@Param("iName")String iName,@Param("description")String description,@Param("sellerID")String sellerID,@Param("price")int price,@Param("date_added")Date date_added);
    
    @Modifying@Transactional
    @Query(value = "INSERT INTO service (serviceID, cID, sName, description, sellerID, price, date_added) values (:serviceID, :cID, :sName, :description, :sellerID, :price, :date_added)", nativeQuery = true)
    int  insertBackToService(@Param("serviceID")String serviceID,@Param("cID")String cID,@Param("sName")String sName,@Param("description")String description,@Param("sellerID")String sellerID,@Param("price")int price,@Param("date_added")Date date_added);
    
    @Modifying@Transactional
    @Query(value = "DELETE FROM admin WHERE productID=:productID", nativeQuery = true)
    int  dropProduct(@Param("productID")String productID);
    
    @Query(value = "SELECT user.email FROM admin inner join user on admin.sellerID = user.accountID  WHERE productID = :pID", nativeQuery = true)
    String getemail(@Param("pID")String pID);
    
    @Modifying@Transactional
    @Query(value = "INSERT INTO admin (productID, cID, name, description, sellerID, price, date_added, type) values (:productID, :cID, :name, :description, :sellerID, :price, :date_added, :type)", nativeQuery = true)
    int  insertToAdmin(@Param("productID")String productID,@Param("cID")String cID,@Param("name")String name,@Param("description")String description,@Param("sellerID")String sellerID,@Param("price")int price,@Param("date_added")Date date_added,@Param("type")String type);
    
    @Query(value = "SELECT COUNT(sub_category.cID) FROM item INNER JOIN sub_category ON sub_category.subCID = item.cID WHERE sub_category.cID = :cID", nativeQuery = true)
    int getcountItem(@Param("cID")String cID);

    @Query(value = "SELECT SUM(orders.quantity*item.price)FROM orders inner join item on orders.productID=item.itemID where orders.quantity >0 and year(orders.date_added)=year(NOW()) and month(orders.date_added) =:month", nativeQuery = true)
	String getmonthlyitemsum(@Param("month") int month);

    @Query(value = "SELECT SUM(service.price)FROM orders inner join service on orders.productID=service.serviceID where orders.quantity =-1 and year(orders.date_added)=year(NOW()) and month(orders.date_added) =:month", nativeQuery = true)
	String getmonthlyservicesum(@Param("month") int month);

    @Query(value = "SELECT count(*)FROM orders where quantity >0 and year(date_added)=year(NOW()) and month(date_added) =:month", nativeQuery = true)
	int getmonthlyitemnumber(@Param("month") int month);

    @Query(value = "SELECT count(*)FROM orders where quantity = -1 and year(date_added)=year(NOW()) and month(date_added) =:month", nativeQuery = true)
	int getmonthlyservicenumber(@Param("month") int month);
    
    @Query(value = "SELECT count(*)FROM admin ", nativeQuery = true)
 	int gettotalpadding();
    
    @Modifying@Transactional
    @Query(value = "DELETE FROM photo WHERE productID=:productID", nativeQuery = true)
 	int deleteImage(@Param("productID")String productID);

    @Query(value = "SELECT * FROM admin where productID=:pID", nativeQuery = true)
	Admin getdetailbyid(@Param("pID") String pID);

    @Query(value = "select category.cName from category where category.categoryID=(SELECT sub_category.cID FROM admin inner join sub_category On admin.cID=sub_category.subCID where admin.productID = :pID)", nativeQuery = true)
	String getcategoryname(@Param("pID") String pID);
    
    @Query(value = "SELECT accountID from user where userID = :userID", nativeQuery = true)
	String getsellerID(@Param("userID") String userID);
    
}