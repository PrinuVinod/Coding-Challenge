async function make_async_call() {
    const response = await fetch("https://google.com");
    console.log("Response received", response)
}

make_async_call()