package com.example.phoneforward

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val intent = Intent(this, HttpService::class.java)
        startService(intent)
    }

    override fun onDestroy() {
        super.onDestroy()
        val intent = Intent(this, HttpService::class.java)
        stopService(intent)
    }
}
