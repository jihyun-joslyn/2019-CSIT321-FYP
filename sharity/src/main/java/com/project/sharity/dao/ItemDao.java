package com.project.sharity.dao;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

import javax.transaction.Transactional;

import com.project.sharity.model.Item;

public interface ItemDao extends CrudRepository<Item, String> {
    
    @Query(value = "SELECT * FROM item ORDER BY itemID", nativeQuery = true)
    List<Item> getAllItems();

    @Query(value = "SELECT * FROM item WHERE iName LIKE CONCAT('%',:name,'%')", nativeQuery = true)
    List<Item> getSearchResult(@Param("name")String name);
    
    @Query(value = "SELECT photo.img FROM item INNER JOIN photo On :itemid = photo.productID where itemid = :itemid", nativeQuery = true)
    String getitemimg(@Param("itemid")String itemid);

    @Query(value = "SELECT * FROM item WHERE itemID = :pID", nativeQuery = true)
    Item getItemDetail(@Param("pID")String pID);

    @Query(value = "SELECT userID FROM user WHERE accountID = :uID", nativeQuery = true)
    String getSellerName(@Param("uID")String uID);

    @Query(value = "SELECT sub_category.cName FROM item INNER JOIN sub_category ON item.cID = sub_category.subCID WHERE sub_category.subCID = :cID AND item.itemID = :pID", nativeQuery = true)
    String getCategoryName(@Param("cID")String cID, @Param("pID")String pID);

    @Query(value = "SELECT accountID FROM user WHERE userID = :uID", nativeQuery = true)
    String getAccountID(@Param("uID")String uID);

    @Modifying@Transactional
    @Query(value = "UPDATE item SET cID = :cID, description = :desc, iName = :name, price = :price, quantity = :quantity WHERE itemID = :id", nativeQuery = true)
    int updateItem(@Param("cID")String cID, @Param("desc")String desc, @Param("name")String name, @Param("price")int price, @Param("quantity")int quantity, @Param("id")String itemID);

    @Query(value = "SELECT * FROM item WHERE cID IN (SELECT subCID FROM sub_category WHERE cID = :cID) ORDER BY date_added DESC", nativeQuery = true)
    List<Item> getItemByCat(@Param("cID")String cID);

    @Query(value = "SELECT * FROM item WHERE sellerID IN (SELECT accountID FROM user WHERE userID = :uID) ORDER BY date_added DESC ", nativeQuery = true)
    List<Item> getUploadItem(@Param("uID")String userID);
    
    @Query(value = "SELECT description FROM item WHERE itemID = :itemID", nativeQuery = true)
    String  getDescription(@Param("itemID")String itemID);
    
    @Modifying@Transactional
    @Query(value = "UPDATE item SET quantity=:quantity WHERE itemID = :pID", nativeQuery = true)
    int  changeQuantity(@Param("quantity")int quantity,@Param("pID")String pID);
    
    @Query(value = "SELECT * FROM item WHERE cID IN (SELECT subCID FROM sub_category WHERE cID = :cID) and iName LIKE CONCAT('%',:name,'%') ORDER BY date_added DESC", nativeQuery = true)
    List<Item> getSearchItemByCat(@Param("cID")String cID,@Param("name")String name);
	
	@Query(value = "SELECT * FROM item WHERE cID = :cID and iName LIKE CONCAT('%',:name,'%') ORDER BY date_added DESC", nativeQuery = true)
    List<Item> getSearchItemBySubCat(@Param("cID")String cID,@Param("name")String name);
	
	@Query(value = "SELECT sub_category.cID FROM view_history INNER JOIN item INNER JOIN sub_category ON view_history.productID = item.itemID AND item.cID = sub_category.subCID WHERE view_history.accountID = :uID and view_history.productID in (select itemID from item) group by sub_category.cID order by sub_category.cID", nativeQuery = true)
    List<String> getRecommandViewItemCID(@Param("uID")String accountID);
    @Query(value = "SELECT COUNT(viewID) FROM view_history INNER JOIN item INNER JOIN sub_category ON view_history.productID = item.itemID AND item.cID = sub_category.subCID WHERE view_history.accountID = :uID and view_history.productID in (select itemID from item) group by sub_category.cID order by sub_category.cID", nativeQuery = true)
    List<Integer> getRecommandDataViewCount(@Param("uID")String accountID);  
     
    @Query(value = "SELECT sub_category.cID FROM orders INNER JOIN item INNER JOIN sub_category ON orders.productID = item.itemID AND item.cID = sub_category.subCID WHERE orders.accountID = :uID and orders.productID in (select itemID from item) group by sub_category.cID order by sub_category.cID ", nativeQuery = true)
    List<String> getRecommandDataOrderCID(@Param("uID")String accountID);
	
    @Query(value = "SELECT COUNT(productID) FROM orders INNER JOIN item INNER JOIN sub_category ON orders.productID = item.itemID AND item.cID = sub_category.subCID WHERE orders.accountID = :uID and orders.productID in (select itemID from item) group by sub_category.cID order by sub_category.cID ", nativeQuery = true)
    List<Integer> getRecommandDataOrderCount(@Param("uID")String accountID); 
}