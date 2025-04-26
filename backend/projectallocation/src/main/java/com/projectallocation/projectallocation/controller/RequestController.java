// package com.projectallocation.projectallocation.controller;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import com.projectallocation.projectallocation.Entity.Request;
// import com.projectallocation.projectallocation.service.RequestService;

// import jakarta.transaction.Transactional;

// @RestController
// @RequestMapping("/requests")
// @CrossOrigin
// public class RequestController {

//     @Autowired
//     private RequestService requestService;

//     // Send a request
//     @CrossOrigin
//     @PostMapping
//     public Request sendRequest(@RequestBody Request request) {
//         return requestService.sendRequest(request);
//     }

//     // Get all requests for a student (as receiver)
//     @CrossOrigin
//     @GetMapping("/receiver/{receiverId}")
//     public List<Request> getRequestsForStudent(@PathVariable int receiverId) {
//         return requestService.getRequestsForStudent(receiverId);
//     }

//     // Update request status
//     @CrossOrigin
//     @PutMapping("/{requestId}")
//     public Request updateRequestStatus(@PathVariable int requestId, @RequestParam(required = false) String status,
//             @RequestParam(required = false) Integer projectid) {
//         return requestService.updateRequestStatus(requestId, status, projectid);
//     }

//     @DeleteMapping("/deleteByReceiver/{receiverId}")
//     public ResponseEntity<?> deleteRequestsByReceiver(@PathVariable int receiverId) {
//         try {
//             requestService.deleteRequestsByReceiver(receiverId);
//             return ResponseEntity.ok().build();
//         } catch (Exception e) {
//             return ResponseEntity.internalServerError()
//                    .body("Error deleting requests: " + e.getMessage());
//         }
//     }


// }
package com.projectallocation.projectallocation.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.projectallocation.projectallocation.Entity.Request;
import com.projectallocation.projectallocation.service.RequestService;

@RestController
@RequestMapping("/requests")
@CrossOrigin
public class RequestController {

    @Autowired
    private RequestService requestService;

    // Send a request
    @PostMapping
    public Request sendRequest(@RequestBody Request request) {
        return requestService.sendRequest(request);
    }

    // Get all requests for a student (as receiver)
    @GetMapping("/receiver/{receiverId}")
    public List<Request> getRequestsForStudent(@PathVariable int receiverId) {
        return requestService.getRequestsForStudent(receiverId);
    }

    // Update request status
    @PutMapping("/{requestId}")
    public Request updateRequestStatus(@PathVariable int requestId, @RequestParam(required = false) String status, @RequestParam(required = false) Integer projectid) {
        System.out.println("sjrghwlrhgwljhgwh"+status);
        return requestService.updateRequestStatus(requestId, status, projectid);
    }
    
//    @DeleteMapping("/deleteByReceiver/{receiverId}")
//    public void deleteRequestsByReceiver(@PathVariable int receiverId) {
//        requestService.deleteRequestsByReceiver(receiverId);
//    }
    
    @DeleteMapping("/deleteByReceiver/{receiverId}")
    public ResponseEntity<?> deleteRequestsByReceiver(@PathVariable int receiverId) {
        try {
            requestService.deleteRequestsByReceiver(receiverId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                   .body("Error deleting requests: " + e.getMessage());
        }
    }
    

}