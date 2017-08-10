{
  "targets": [
    {
     "target_name": "EllaBookProxy",
      "sources":[ "EllaBookProxy.cc" ],
      "libraries": [],
       "conditions": [
        [
          "OS=='win'",
          {
            "link_settings": {
              "libraries": [
                "-l../EllaBookProxy.lib"
               ]
            }
          }
        ]
      ]
    }
  ]
}
