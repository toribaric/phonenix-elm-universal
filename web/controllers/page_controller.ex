defmodule PhonenixElmUniversal.PageController do
  use PhonenixElmUniversal.Web, :controller

  def index(conn, _params) do
    initial_state = %{
      entries: ["First thing", "Second thing"],
      results: ["First thing", "Second thing"],
      filter: ""
    }

    opts = %{
      path: "./priv/server/js/main.js",
      component: "Main",
      render: "embed",
      id: "elm-app",
      data: initial_state,
    }

    result = PhonenixElmUniversal.ElmIo.json_call!(opts)

    render(conn, "index.html", html: result["html"], initial_state: initial_state)
  end
end
