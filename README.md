# A microservice to create thumbnail from a pdf

I am working on a project where users can upload and publish PDF documents, and I wanted to use the first page of the uploaded pdf as the thumbnail instead of allowing users to arbitrarily set a thumbnail in order to avoid clickbaits. So to achieve that I built this microservice which I deployed on Google Cloud Run, which I can hit with a link of a PDF document and it returns a URL of the image of the first page of the PDF.
