import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

function Test() {
  const [userinfo, setUserinfo] = useState(null);
  async function fetchData() {
    try {
      const User = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("userinfo")
        .select("*")
        .eq("id", User.data.user.id)
        .single();

      if (data) {
        setUserinfo(data.BMR);
      }
    } catch (error) {
      console.error("Error fetching userinfo:", error.message);
    }
  }

  fetchData();

  return <h1>{userinfo}</h1>;
}

export default Test;
