module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

type alias Model =
    { entries : List String
    , results : List String
    , filter : String
    }

type Msg
    = Filter String
    | Add

main =
    Html.programWithFlags
        { init = init
        , view = view
        , update = update
        , subscriptions = (\_ -> Sub.none)
        }

model : Model
model =
    { entries = []
    , results = []
    , filter = ""
    }

init : Model -> ( Model, Cmd Msg )
init flags =
    ( Model flags.entries flags.results flags.filter, Cmd.none )

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Filter filter ->
            ({ model
                | results = List.filter (String.contains filter) model.entries
                , filter = filter
            }, Cmd.none)

        Add ->
            ({ model
                | entries = model.filter :: model.entries
                , results = model.filter :: model.results
            }, Cmd.none)

view : Model -> Html Msg
view model =
    div []
        [ input [ placeholder "Filter…", onInput Filter ] []
        , button [ onClick Add ] [ text "Add New" ]
        , ul [] (List.map viewEntry model.results)
        ]

viewEntry : String -> Html Msg
viewEntry entry =
    li [] [ text entry ]
