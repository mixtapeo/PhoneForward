package com.example.phoneforward

import android.app.Service
import android.content.Intent
import android.os.IBinder
import android.util.Log
import fi.iki.elonen.NanoHTTPD
import java.io.IOException


class HttpService : Service() {
    private var server: MyHTTPD? = null
    override fun onCreate() {
        super.onCreate()
        server = MyHTTPD()
        try {
            server!!.start()
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }

    override fun onStartCommand(intent: Intent, flags: Int, startId: Int): Int {
        return START_STICKY
    }

    override fun onDestroy() {
        super.onDestroy()
        server!!.stop()
    }

    override fun onBind(intent: Intent): IBinder? {
        return null
    }

    private inner class MyHTTPD : NanoHTTPD(8080) {
        override fun serve(session: IHTTPSession): Response {
            if (Method.POST == session.method) {
                val files: Map<String, String> = HashMap()
                return try {
                    session.parseBody(files)
                    val postData = files["postData"]
                    Log.d("HttpService", "Received: $postData")
                    // Process the received data as needed
                    newFixedLengthResponse(
                        Response.Status.OK,
                        "application/json",
                        "{\"status\":\"success\"}"
                    )
                } catch (e: Exception) {
                    e.printStackTrace()
                    newFixedLengthResponse(
                        Response.Status.INTERNAL_ERROR,
                        "text/plain",
                        "Internal Server Error"
                    )
                }
            }
            return newFixedLengthResponse(Response.Status.NOT_FOUND, "text/plain", "Not Found")
        }
    }
}

