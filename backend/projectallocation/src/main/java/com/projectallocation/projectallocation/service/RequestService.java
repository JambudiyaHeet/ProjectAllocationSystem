//package com.projectallocation.projectallocation.service;
//
//import java.util.List;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import com.projectallocation.projectallocation.Entity.Request;
//import com.projectallocation.projectallocation.dao.RequestDao;
//
//@Service
//public class RequestService {
//
//    @Autowired
//    private RequestDao requestdao;
//
//    // Send a request
//    public Request sendRequest(Request request) {
//        return requestdao.save(request);
//    }
//
//    // Get all requests for a student (as receiver)
//    public List<Request> getRequestsForStudent(int studentId) {
//        return requestdao.findByReceiverId(studentId);
//    }
//
//    // Update request status (e.g., ACCEPTED or DECLINED)
//    public Request updateRequestStatus(int requestId, String status) {
//        Request request = requestdao.findById(requestId).orElseThrow(() -> new RuntimeException("Request not found"));
//        request.setStatus(status);
//        return requestdao.save(request);
//    }
//}

package com.projectallocation.projectallocation.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import com.projectallocation.projectallocation.Entity.Request;
import com.projectallocation.projectallocation.dao.RequestDao;

@Service
public class RequestService {

    @Autowired
    private RequestDao requestdao;

    // Send a request
    public Request sendRequest(Request request) {
        return requestdao.save(request);
    }

    // Get all requests for a student (as receiver)
    public List<Request> getRequestsForStudent(int receiverId) {
        return requestdao.findByReceiverId(receiverId);
    }

    // Update request status (e.g., ACCEPTED or DECLINED)
    public Request updateRequestStatus(int requestId, String status, Integer projectid) {
        Request request = requestdao.findById(requestId)
            .orElseThrow(() -> new RuntimeException("Request not found"));

        // Update status if provided
        if (status != null) {
            request.setStatus(status);
        }

        // Update projectid if provided
        if (projectid != null) {
            request.setProjectid(projectid);
        }

        return requestdao.save(request);
    }
    
    public void deleteRequestsByReceiver(int receiverId) {
        requestdao.deleteByReceiverId(receiverId);
    }

}