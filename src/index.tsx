import { GiphyFetch } from "@giphy/js-fetch-api";
import { IGif } from "@giphy/js-types";
import {
  Carousel,
  Gif,
  Grid,
  Video,
  VideoOverlay
} from "@giphy/react-components";
import React, { useState } from "react";
import { useAsync } from "react-async-hook";
import { render } from "react-dom";
import ResizeObserver from "react-resize-observer";

const giphyFetch = new GiphyFetch("sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh");

function GifDemo() {
  const [gif, setGif] = useState<IGif | null>(null);
  useAsync(async () => {
    const { data } = await giphyFetch.gif("fpXxIjftmkk9y");
    setGif(data);
  }, []);
  return gif && <Gif gif={gif} width={200} />;
}

function VideoOverlayDemo() {
  const [gif, setGif] = useState<IGif | null>(null);
  useAsync(async () => {
    // we know this is a video clip
    const { data } = await giphyFetch.gif("D068R9Ziv1iCjezKzG");
    setGif(data);
  }, []);
  return gif && <Gif gif={gif} width={200} overlay={VideoOverlay} />;
}

function VideoDemo() {
  const [gif, setGif] = useState<IGif | null>(null);
  useAsync(async () => {
    // we know this is a video clip
    const { data } = await giphyFetch.gif("D068R9Ziv1iCjezKzG");
    setGif(data);
  }, []);
  return gif && <Video gif={gif} width={200} muted />;
}

function CarouselDemo() {
  const fetchGifs = (offset: number) =>
    giphyFetch.search("dogs", { offset, limit: 10 });
  return <Carousel fetchGifs={fetchGifs} gifHeight={200} gutter={6} />;
}

function GridDemo({ onGifClick }) {
  const fetchGifs = (offset: number) =>
    giphyFetch.trending({ offset, limit: 10 });
  const [width, setWidth] = useState(window.innerWidth);
  return (
    <>
      <Grid
        onGifClick={onGifClick}
        fetchGifs={fetchGifs}
        width={width}
        columns={3}
        gutter={6}
      />
      <ResizeObserver
        onResize={({ width }) => {
          setWidth(width);
        }}
      />
    </>
  );
}

function App() {
  const [modalGif, setModalGif] = useState();
  return (
    <>
      <img src="./logo.gif" width="200" alt="Powered by GIPHY" />
      <h4>Gif</h4>
      <GifDemo />
      <h4>Gif with Video Overlay</h4>
      <VideoOverlayDemo />
      <h4>Video (muted)</h4>
      <VideoDemo />
      <h4>Carousel</h4>
      <CarouselDemo />
      <h4>Grid</h4>
      <GridDemo
        onGifClick={(gif, e) => {
          console.log("gif", gif);
          e.preventDefault();
          setModalGif(gif);
        }}
      />
      {modalGif && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0, 0, 0, .8)"
          }}
          onClick={(e) => {
            e.preventDefault();
            setModalGif(undefined);
          }}
        >
          <Gif gif={modalGif} width={200} />
        </div>
      )}
    </>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
