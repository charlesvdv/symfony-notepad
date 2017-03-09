<?php

namespace NotepadBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use NotepadBundle\Entity\Category;
use NotepadBundle\Entity\Note;

class NoteApiController extends Controller
{
    /**
     * @Route("/api/note/{id}")
     * @Method("GET")
     */
    function getNoteAction(Note $note) {
        $serializer = $this->get('serializer');

        if (! $note) {
            // TODO.
        }
        return new JsonResponse($serializer->serialize($note, 'json'));
    }

    /**
     * @Route("/api/notes/")
     * @Method("GET")
     */
    function getNotesAction() {
        $serializer = $this->get('serializer');

        $em = $this->getDoctrine()->getManager();
        $notes = $em->getRepository('NotepadBundle:Note')->findAll();

        return new JsonResponse($serializer->serialize($notes, 'json'));
    }

    /**
     * @Route("/api/note/")
     * @Method("POST")
     */
    function createNoteAction(Request $request) {
        $note = new Note();
        return $this->updateNoteAction($request, $note);
    }

    /**
     * @Route("/api/note/{id}")
     * @Method("PUT")
     */
    function updateNoteAction(Request $request, Note $note) {
        $data = json_decode($request->getContent(), true);

        $em = $this->getDoctrine()->getManager();
        $category = $em->getRepository('NotepadBundle:Category')->find($data['category']);

        $note->setTitle($data['title']);
        $note->setContent($data['content']);
        $note->setCategory($category);

        $em->persist($note);
        $em->flush();

        return new Response();
    }

    /**
     * @Route("/api/note/{id}")
     * @Method("DELETE")
     */
    function deleteNoteAction(Note $note) {
        $em = $this->getDoctrine()->getEntityManager();
        $em->remove($note);
        $em->flush();

        return new Response();
    }
}
