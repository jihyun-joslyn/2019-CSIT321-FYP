package com.project.sharity.dao;

import java.util.List;

import com.project.sharity.model.Service;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface ServiceDao extends CrudRepository<Service, String> {
    @Query(value = "SELECT * FROM service ORDER BY serviceID", nativeQuery = true)
    List<Service> getAllServices();

    @Query(value = "SELECT * FROM service WHERE sName LIKE CONCAT('%',:name,'%')", nativeQuery = true)
    List<Service> getSearchResult(@Param("name")String name);
    
    @Query(value = "SELECT photo.img FROM service INNER JOIN photo On :serviceid = photo.productID where serviceid = :serviceid", nativeQuery = true)
    String getserviceimg(@Param("serviceid")String serviceid);

    @Query(value = "SELECT * FROM service WHERE serviceID = :pID", nativeQuery = true)
    Service getServiceDetail(@Param("pID")String pID);

    @Query(value = "SELECT userID FROM user WHERE accountID IN (SELECT sellerID FROM service WHERE serviceID = :pID)", nativeQuery = true)
    String getSellerName(@Param("pID")String pID);

    @Query(value = "SELECT cName FROM sub_category WHERE subCID IN (SELECT cID FROM service WHERE serviceID = :pID)", nativeQuery = true)
    String getCategoryName(@Param("pID")String pID);

    @Query(value = "SELECT accountID FROM user WHERE userID = :uID", nativeQuery = true)
    String getAccountID(@Param("uID")String uID);

    @Modifying@Transactional
    @Query(value = "UPDATE service SET cID = :cID, description = :desc, sName = :name, price = :price WHERE serviceID = :id", nativeQuery = true)
    int updateService(@Param("cID")String cID, @Param("desc")String desc, @Param("name")String name, @Param("price")int price, @Param("id")String ServiceID);

    @Query(value = "SELECT * FROM service WHERE cID IN (SELECT subCID FROM sub_category WHERE cID = :cID) ORDER BY date_added DESC", nativeQuery = true)
    List<Service> getServiceByCat(@Param("cID")String cID);

    @Query(value = "SELECT * FROM service WHERE sellerID IN (SELECT accountID FROM user WHERE userID = :uID) ORDER BY date_added DESC ", nativeQuery = true)
    List<Service> getUploadService(@Param("uID")String userID);
    
    @Query(value = "SELECT * FROM service WHERE cID IN (SELECT subCID FROM sub_category WHERE cID = :cID) and sName LIKE CONCAT('%',:name,'%') ORDER BY date_added DESC", nativeQuery = true)
    List<Service> getSearchServiceByCat(@Param("cID")String cID,@Param("name")String name);
	
	
    @Query(value = "SELECT sub_category.cID FROM view_history INNER JOIN service INNER JOIN sub_category ON view_history.productID = service.serviceID AND service.cID = sub_category.subCID WHERE view_history.accountID = :uID AND view_history.productID IN (SELECT serviceID FROM service) GROUP BY sub_category.cID ORDER BY sub_category.cID", nativeQuery = true)
    List<String> getRecommandViewSerCID(@Param("uID")String accountID);
	
    @Query(value = "SELECT COUNT(viewID) FROM view_history INNER JOIN service INNER JOIN sub_category ON view_history.productID = service.serviceID AND service.cID = sub_category.subCID WHERE view_history.accountID = :uID and view_history.productID in (select serviceID from service) group by sub_category.cID order by sub_category.cID", nativeQuery = true)
    List<Integer> getRecommandSerViewCount(@Param("uID")String accountID);  
     
    @Query(value = "SELECT sub_category.cID FROM orders INNER JOIN service INNER JOIN sub_category ON orders.productID = service.serviceID AND service.cID = sub_category.subCID WHERE orders.accountID = :uID and orders.productID in (select serviceID from service) group by sub_category.cID order by sub_category.cID ", nativeQuery = true)
    List<String> getRecommandSerOrderCID(@Param("uID")String accountID);
	
    @Query(value = "SELECT COUNT(productID) FROM orders INNER JOIN service INNER JOIN sub_category ON orders.productID = service.serviceID AND service.cID = sub_category.subCID WHERE orders.accountID = :uID and orders.productID in (select serviceID from service) group by sub_category.cID order by sub_category.cID ", nativeQuery = true)
    List<Integer> getRecommandSerOrderCount(@Param("uID")String accountID);
    
    @Query(value = "SELECT * FROM service WHERE cID = :cID and isName LIKE CONCAT('%',:name,'%') ORDER BY date_added DESC", nativeQuery = true)
    List<Service> getSearchServiceBySubCat(@Param("cID")String cID,@Param("name")String name);
}